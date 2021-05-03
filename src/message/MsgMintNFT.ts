import {Msg} from "./common/Msg";
import {AccAddress} from "../type";

export interface MsgMintNFTValue {
    hash: string,
    tokenURI: string,
    owner: AccAddress
}

export class MsgMintNFT extends Msg {
    public readonly type: string = 'nft/MsgMintNFT';
    public readonly value: MsgMintNFTValue;

    constructor(hash: string, owner: AccAddress, tokenURI: string) {
        super();

        this.value = {hash, owner, tokenURI}
    }
}
