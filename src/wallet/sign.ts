import crypto from "crypto";
import secp256k1 from "secp256k1";

interface Signature {
    signature: Buffer,
    recoverId: number
}

export const hashMessage = (s: string): string => {
    return crypto
        .createHash('sha256')
        .update(s)
        .digest('hex');
};

export const sign = (b: Buffer, privateKey: Buffer): Signature => {
    const signed = secp256k1.ecdsaSign(b, privateKey);

    return {
        signature: Buffer.from(signed.signature),
        recoverId: signed.recid
    };
};

export const signHash = (hash: string, privateKey: Buffer): Signature => {
    const buffer = Buffer.from(hash, 'hex');

    return sign(buffer, privateKey);
};

export const signJSON = (json: object, privateKey: Buffer): Signature => {
    let str;
    try {
        str = JSON.stringify(json);
    } catch (e) {
        throw e;
    }

    const hash = hashMessage(str);
    const buffer = Buffer.from(hash, 'hex');

    return sign(buffer, privateKey);
}

export const parseDER = (signature: Buffer | Uint8Array) => {
    return secp256k1.signatureImport(signature);
};

export const recover = (signature: Buffer | Uint8Array, recoverId: number, message: Buffer | Uint8Array): Uint8Array => {
    return secp256k1.ecdsaRecover(signature, recoverId, message);
};
