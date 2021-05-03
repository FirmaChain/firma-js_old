const {Wallet} = require('../dist');
const testAccount = require('./test_account.json');

const mnemonic = Wallet.generateMnemonic();
const index = 0; // HD Path Index

console.log(mnemonic);

const keyPair = Wallet.keyPairFromMnemonic(mnemonic, index);

const address = keyPair.accAddress;
const privateKey = keyPair.privateKey;
const publicKey = keyPair.publicKey;

const privateKeyString = privateKey.toString('hex');
const publicKeyString = publicKey.toString('hex');

console.log(
    {
        privateKey: privateKeyString,
        publicKey: publicKeyString,
        accAddress: address,
    }
);

console.log('=================')
// Wallet instance from same mnemonic
const wallet1 = Wallet.fromMnemonic(mnemonic, index);
console.log(wallet1);

console.log('=================')
// Wallet instance from same private key
const wallet2 = Wallet.fromPrivateKey(privateKey);
console.log(wallet2);

console.log('=================')
// Wallet instance from saved private key
const wallet3 = Wallet.fromPrivateKey(testAccount.privateKey);
console.log(wallet3);

console.log('=================')
// Wallet instance from saved mnemonic
const wallet4 = Wallet.fromMnemonic(testAccount.mnemonic);
console.log(wallet4);
