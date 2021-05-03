const {Firma, MsgSend, StdTx, Wallet} = require('../dist');
const testAccount = require('./test_account.json');

const chainId = 'test';
const lcdUrl = 'http://localhost:1317';

const firma = new Firma(chainId, lcdUrl);

// Init Wallet
const wallet = Wallet.fromPrivateKey(testAccount.privateKey);

// send msg
const msg = new MsgSend(testAccount.accAddress, "firma1rhfahdeh2f644f8mjeclyzp2jn9cshs0md8z5a", (2 * 10 ** 6));

// create StdTx
const stdTx = new StdTx(msg);
/*
Way 1
// calculate gas
firma.tx.estimateGas(stdTx, 2).then((fee => {
    stdTx.setFee(fee); // set fee to StdTx

    // sign StdTx
    firma.signStdTx(stdTx, wallet).then(signedTx => {

        // broadcast tx
        firma.tx.broadcast(signedTx).then((result) => {
            console.log(result)
        });
    });
}));
*/

/*
Way 2
stdTx.setFeeWithEstimate(firma.lcd, 2).then(() => {
    firma.signStdTx(stdTx, wallet).then((signedTx) => {
        firma.tx.broadcast(signedTx).then((result) => {
            console.log(result)
        });
    })
});
*/

firma.createAndSign(wallet, msg).then((signedTx) => {
    firma.tx.broadcast(signedTx).then(console.log)
})
