const {Firma, Wallet, MsgBurnNFT} = require('../dist');
const testAccount = require('./test_account.json');

const chainId = 'test';
const lcdUrl = 'http://localhost:1317';

const firma = new Firma(chainId, lcdUrl);

// Init Wallet
const wallet = Wallet.fromPrivateKey(testAccount.privateKey);

// BurnNFT msg
const msg = new MsgBurnNFT("f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b", testAccount.accAddress);

firma.createAndSign(wallet, msg).then((signedTx) => {
    firma.tx.broadcast(signedTx).then(console.log)
}).catch(console.error);