export class PublicKey {
    type: string = 'tendermint/PubKeySecp256k1';
    value: string;

    constructor(value: Buffer | string) {
        if (Buffer.isBuffer(value))
            value = value.toString('base64');

        this.value = value;
    }
}
