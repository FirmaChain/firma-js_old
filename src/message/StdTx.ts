import {Msg} from "./common/Msg";
import {Fee} from "./common/Fee";
import {Signature} from "./common/Signature";
import {LCD} from "../lcd";

export interface StdTxValue {
    fee: Fee,
    memo: string;
    msg: Msg[];
    signatures?: Signature[]
}

export class StdTx extends Msg {
    type: string = 'cosmos-sdk/StdTx';
    value: StdTxValue;

    constructor(msgs: Msg[] | Msg, memo: string = '', fee?: Fee, signatures?: Signature[]) {
        super();

        if (!Array.isArray(msgs))
            msgs = [msgs];
        if (!fee || !(fee instanceof Fee))
            fee = new Fee('200000', null);

        this.value = {fee, memo, msg: msgs, signatures};
    }


    setFee(fee: Fee) {
        if (!fee)
            throw new Error("invalid fee");

        this.value.fee = fee;
    }

    setFeeWithEstimate(lcd: LCD, adj?: number, gasPrice?: number, denom?: string) {
        return lcd.estimateGas(this, adj, gasPrice, denom).then((fee) => {
            this.setFee(fee);
        })
    }

    setSignatures(signatures: Signature[]) {
        this.value.signatures = signatures;
    }
}
