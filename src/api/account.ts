import {API, LCD} from "../lcd";
import {Coin} from "../message";

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

    async getAccount(address: string): Promise<AccountResult> {
        console.log('adsfasdf')
        return new Promise<AccountResult>((resolve, reject) => {
            this.lcd.get("auth/accounts/" + address).then((res) => {
                if (res.error)
                    reject(res.error);

                resolve(res.result?.value);
            }).catch(reject);
        })
    }
}
