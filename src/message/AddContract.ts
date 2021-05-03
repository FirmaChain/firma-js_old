import {Msg} from "./common/Msg";
import {AccAddress} from "../type";

export interface AddContractValue {
    path: string,
    hash: string,
    owner: AccAddress
}

export class AddContract extends Msg {
    public readonly type: string = 'contract/AddContract';
    public readonly value: AddContractValue;

    constructor(path: string, hash: string, owner: AccAddress) {
        super();

        this.value = {path, hash, owner}
    }
}
