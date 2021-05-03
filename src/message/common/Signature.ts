import {PublicKey} from "./PublicKey";

export interface Signature {
}

export class Signature {
    signature: string;
    pub_key: PublicKey;

    constructor(signature: Buffer | string, pub_key: PublicKey) {
        if (Buffer.isBuffer(signature))
            signature = signature.toString('base64');

        this.signature = signature;
        this.pub_key = pub_key;
    }
}
