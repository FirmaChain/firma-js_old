import {LCD} from "./lcd";
import * as API from "./api"
import {Msg, StdTx} from "./message";
import {Wallet} from "./wallet";

export * from "./message";
export * from "./wallet";

export class Firma {
    public readonly chainId: string;
    public readonly url: string;
    public readonly lcd: LCD;

    public readonly account: API.Account;
    public readonly blockchain: API.Blockchain;
    public readonly tx: API.Transaction;

    constructor(chainId: string, url: string, gasPrice?: number, gasAdjustment?: number, denom?: string) {
        this.chainId = chainId;
        this.url = url;
        this.lcd = new LCD(chainId, url, {gasPrice, gasAdjustment, denom});

        this.account = new API.Account(this.lcd);
        this.blockchain = new API.Blockchain(this.lcd);
        this.tx = new API.Transaction(this.lcd);
    }

    public signStdTx(stdTx: StdTx, wallet: Wallet): Promise<StdTx> {
        return new Promise<StdTx>(async (resolve, reject) => {
            let account;

            try {
                account = await this.account.getAccount(wallet.accAddress);
                wallet.setAccount(account.account_number);
            } catch (e) {
                return reject(e);
            }

            try {
                const signedTx = wallet.signStdTx(stdTx, this.chainId, account.account_number, account.sequence);
                resolve(signedTx);
            } catch (e) {
                return reject(e);
            }
        });
    }

    // Referenced @terra-money/terra.js
    public async createAndSign(wallet: Wallet, msgs: Msg[] | Msg, memo: string = '') {
        if (!(wallet instanceof Wallet))
            throw 'invalid wallet';

        const stdTx = new StdTx(msgs, memo);

        try {
            await stdTx.setFeeWithEstimate(this.lcd);
        } catch (e) {
            throw e;
        }

        return await this.signStdTx(stdTx, wallet);
    }
}
