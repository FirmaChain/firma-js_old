import {Coin} from "./common/Coin";
import {Msg} from "./common/Msg";
import {AccAddress} from "../type";

export interface InputOuput {
    address: AccAddress,
    coins: Coin[]
}

export interface MsgMultiSendValue {
    inputs: InputOuput[],
    outputs: InputOuput[]
}

export class MsgMultiSend extends Msg {
    public readonly type: string = 'cosmos-sdk/MsgMultiSend';
    public readonly value: MsgMultiSendValue;

    constructor(inputs: InputOuput[], outputs: InputOuput[]) {
        super();

        this.value = {
            inputs: inputs,
            outputs: outputs
        }
    }
}
