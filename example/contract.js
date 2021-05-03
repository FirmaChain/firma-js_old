const {Firma, Wallet, AddContract} = require('../dist');
const testAccount = require('./test_account.json');

const chainId = 'test';
const lcdUrl = 'http://localhost:1317';

const firma = new Firma(chainId, lcdUrl);

// Init Wallet
const wallet = Wallet.fromPrivateKey(testAccount.privateKey);

// add contract msg
const msg = new AddContract('https://ipfs.infura.io:5001/api/v0/cat?arg=QmTF7NerdGZhnDPJj3Yj51gqH18o8kLtgkgtVjMLk1V9tx', "f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b", testAccount.accAddress);

firma.createAndSign(wallet, msg).then((signedTx) => {
    firma.tx.broadcast(signedTx).then(console.log)
}).catch(console.error)
