import {Msg} from "./common/Msg";
import {AccAddress} from "../type";

export interface MsgBurnNFTValue {
    hash: string,
    owner: AccAddress
}

export class MsgBurnNFT extends Msg {
    public readonly type: string = 'nft/MsgBurnNFT';
    public readonly value: MsgBurnNFTValue;

    constructor(hash: string, owner: AccAddress) {
        super();

        this.value = {hash, owner}
    }
}
