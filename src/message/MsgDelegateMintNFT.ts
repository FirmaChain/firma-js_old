import {Msg} from "./common/Msg";
import {AccAddress} from "../type";

export interface MsgDelegateMintNFTValue {
    hash: string,
    tokenURI: string,
    minter: AccAddress,
    owner: AccAddress,

    description: string,
    image: string,
}

export class MsgDelegateMintNFT extends Msg {
    public readonly type: string = 'nft/MsgDelegateMintNFT';
    public readonly value: MsgDelegateMintNFTValue;

    constructor(hash: string, minter: AccAddress, owner: AccAddress, tokenURI: string, description: string, image: string) {
        super();

        this.value = {hash, minter, owner, tokenURI, description, image}
    }
}
