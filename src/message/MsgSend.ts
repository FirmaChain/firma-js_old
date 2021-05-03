import {Coin} from "./common/Coin";
import {Msg} from "./common/Msg";
import {AccAddress} from "../type";

export interface MsgSendValue {
    from_address: AccAddress,
    to_address: AccAddress,
    amount: Coin[]
}

export class MsgSend extends Msg {
    public readonly type: string = 'cosmos-sdk/MsgSend';
    public readonly value: MsgSendValue;

    constructor(fromAddress: AccAddress, toAddress: AccAddress, amount: number | string, denom: string = "ufirma") {
        super();

        const coin: Coin = {
            amount: amount.toString(),
            denom
        };

        this.value = {
            from_address: fromAddress,
            to_address: toAddress,
            amount: [coin]
        }
    }
}
