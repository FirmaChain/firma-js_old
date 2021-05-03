import {PublicKey} from "./PublicKey";

export class MultisigPublicKey {
    type: string = 'tendermint/PubKeyMultisigThreshold';
    value: {
        threshold: string;
        pubkeys: PublicKey[];
    };

    constructor(threshold: string, pubkeys: PublicKey[]) {
        this.value = {
            threshold,
            pubkeys
        }
    }
}
