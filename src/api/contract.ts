import {API, LCD} from "../lcd";

export interface ContractResult {
    owners: string[],
    hash: string,
    path: string
}

export class Contract extends API {
    constructor(lcd: LCD) {
        super(lcd);
    }

    async getContract(hash: string): Promise<ContractResult> {
        return new Promise<ContractResult>((resolve, reject) => {
            this.lcd.get("contract/" + hash).then((res) => {
                if (res.error)
                    reject(res.error);

                resolve(res.result);
            }).catch(reject);
        })
    }
}
