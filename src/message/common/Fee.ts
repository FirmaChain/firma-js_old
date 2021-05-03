import {Coin} from "./Coin";
import {sortObject} from "../../utils";

export class Fee {
    gas: string;
    amount: Coin[];

    constructor(gas: string, amount: Coin[] | null) {
        this.gas = gas;
        this.amount = sortObject(amount)
    }
}
