import {generateMnemonic, mnemonicToSeedSync} from "bip39";
import {BIP32Interface, fromSeed} from "bip32";
import {bech32} from "bech32";
import cryptoJS from "crypto-js";
import {publicKeyCreate} from "secp256k1";
import {ADDRESS_PREFIX, HD_PATH} from "../const";
import {PublicKey, Signature, StdTx, UnsignedStdTx} from "../message";
import * as signUtils from "./sign";
import {AccAddress} from "../type";

interface KeyPair {
    privateKey: Buffer;
    publicKey: Buffer;
    accAddress: AccAddress
}

export class Wallet implements KeyPair {
    accAddress: AccAddress;
    privateKey: Buffer;
    publicKey: Buffer;
    accountNumber?: number;

    public static utils = signUtils;

    constructor(privateKey: Buffer) {
        const {publicKey, accAddress} = Wallet.keyPairFromPrivate(privateKey);
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.accAddress = accAddress;
    }

    signStdTx(stdTx: StdTx, chainId: string, account_number: string, sequence: string) {
        const uStdTx = new UnsignedStdTx(stdTx, account_number, chainId, sequence).sort();

        const {signature} = signUtils.signJSON(uStdTx, this.privateKey);

        const pubKey = new PublicKey(this.publicKey);
        const signObj = new Signature(signature, pubKey);

        const {msg, fee, memo} = stdTx.value;

        return new StdTx(msg, memo, fee, [signObj]);
    }

    setAccount(accountNumber: string) {
        this.accountNumber = parseInt(accountNumber)
    }

    static fromPrivateKey(privateKey: Buffer | string) {
        if (typeof privateKey === 'string')
            privateKey = Buffer.from(privateKey.replace('0x', ''), 'hex');

        return new Wallet(privateKey);
    }

    static fromMnemonic(mnemonic: string, index: number = 0) {
        const keyPair = Wallet.keyPairFromMnemonic(mnemonic, index);
        return new Wallet(keyPair.privateKey);
    }

    static getBech32Prefix(): string {
        return ADDRESS_PREFIX;
    }

    static getDerivePath(index: number = 0): string {
        return HD_PATH + index;
    }

    static generateMnemonic(strength?: number): string {
        return generateMnemonic(strength || 256);
    }

    static keyPairFromPrivate(privateKey: Buffer | undefined): KeyPair {
        if (typeof privateKey === 'undefined')
            throw new Error('privateKey is undefined.');

        const pubKeyByte: Uint8Array = publicKeyCreate(privateKey);
        const publicKey: Buffer = Buffer.from(pubKeyByte);

        const message = cryptoJS.enc.Hex.parse(publicKey.toString('hex'));

        const hash: string = cryptoJS.RIPEMD160(cryptoJS.SHA256(message)).toString();
        const address: Buffer = Buffer.from(hash, 'hex');
        const words: Buffer = Buffer.from(bech32.toWords(address));

        const accAddress: AccAddress = bech32.encode(Wallet.getBech32Prefix(), words);

        return {
            privateKey: privateKey,
            publicKey: Buffer.from(pubKeyByte),
            accAddress: accAddress
        };
    }

    static keyPairFromMnemonic(mnemonic: string, index: number = 0): KeyPair {
        if (typeof mnemonic !== 'string')
            throw new Error(
                'parameter mnemonic expects a string but got ' + typeof mnemonic
            );

        const seed: Buffer = mnemonicToSeedSync(mnemonic);
        const node: BIP32Interface = fromSeed(seed);
        const child: BIP32Interface = node.derivePath(Wallet.getDerivePath(index));

        return Wallet.keyPairFromPrivate(child.privateKey)
    }


}
