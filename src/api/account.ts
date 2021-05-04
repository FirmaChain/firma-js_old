import {API, LCD} from "../lcd";
import {Coin} from "../message";
import {AccAddress} from "../type";

export interface AccountResult {
    address: string,
    coins: Coin[],
    public_key: string,
    account_number: string,
    sequence: string
}

export class Account extends API {
    constructor(lcd: LCD) {
        super(lcd);
    }

    async getAccount(address: AccAddress): Promise<AccountResult> {
        return new Promise<AccountResult>((resolve, reject) => {
            this.lcd.get("auth/accounts/" + address).then((res) => {
                if (res.error)
                    reject(res.error);

                resolve(res.result?.value);
            }).catch(reject);
        })
    }

    async getBalance(address: AccAddress, denom?: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.getAccount(address).then((value: AccountResult) => {
                if (!Array.isArray(value.coins) || value.coins.length === 0)
                    resolve("0");

                if (!denom)
                    denom = this.lcd.denom;

                const coin = value.coins.find(x => x.denom === denom);

                if (!coin)
                    return resolve("0");

                resolve(coin.amount);
            }).catch(reject);
        })
    }
}
