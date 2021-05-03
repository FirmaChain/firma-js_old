import {Msg} from "./common/Msg";
import {AccAddress} from "../type";

export interface MsgTransferNFTValue {
    hash: string,
    owner: AccAddress,
    recipient: AccAddress
}

export class MsgTransferNFT extends Msg {
    public readonly type: string = 'nft/MsgTransferNFT';
    public readonly value: MsgTransferNFTValue;

    constructor(hash: string, owner: AccAddress, recipient: AccAddress) {
        super();

        this.value = {hash, owner, recipient};
    }
}
