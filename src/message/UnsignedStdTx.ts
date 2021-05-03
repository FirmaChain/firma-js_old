import {Msg, Sortable} from "./common/Msg";
import {StdTx} from "./StdTx";
import {Fee} from "./common/Fee";

export class UnsignedStdTx extends Sortable {
    account_number: string;
    chain_id: string;
    sequence: string;
    fee: Fee;
    memo: string;
    msgs: Msg[];

    constructor(
        StdTx: StdTx,
        accountNumber: string,
        chainId: string,
        sequence: string,
    ) {
        super();

        if (!StdTx || !StdTx.value)
            throw new Error('invalid StdTx');

        this.account_number = accountNumber;
        this.chain_id = chainId;
        this.sequence = sequence;

        this.fee = StdTx.value.fee;
        this.memo = StdTx.value.memo;
        this.msgs = StdTx.value.msg;
    }
}
