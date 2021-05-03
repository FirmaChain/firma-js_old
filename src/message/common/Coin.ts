import {DENOM} from "../../const";

export class Coin {
    amount: string;
    denom: string;

    constructor(amount: string, denom: string = DENOM) {
        this.amount = amount;
        this.denom = denom;
    }
}
