# firma-js
Javascript SDK for FirmaChain

[![npm version](https://badge.fury.io/js/%40firmachain%2Ffirma-js.svg)](https://badge.fury.io/js/%40firmachain%2Ffirma-js)

## Install
You can install `firma-js` using [NPM](https://www.npmjs.com/package/@firmachain/firma-js)
```
yarn add @firmachain/firma-js
```
or
```
npm i @firmachain/firma-js
```

## Usage
### Initializing SDK
```js
const {Firma} = require('@firmachain/firma-js');

const chainId = 'imperium-0001';
const lcdUrl = 'http://localhost:1317';

const firma = new Firma(chainId, lcdUrl);
```

### Create account
```js
const {Wallet} = require('@firmachain/firma-js');

const mnemonic = Wallet.generateMnemonic();
const index = 0;

const wallet = Wallet.fromMnemonic(mnemonic, index);

console.log(wallet.accAddress);
```

### Import account by private key
```js
const {Wallet} = require('@firmachain/firma-js');

const wallet = Wallet.fromPrivateKey(privateKey);

console.log(wallet.accAddress);
```

### Get current block number
```js
firma.blockchain.getBlockNumber().then((blockNumber) => {
    console.log(blockNumber);
}).catch((e) => {
    console.error(e);
};
```

### Get FIRMA balance of specific account
```js
firma.account.getBalance(address).then((balance) => {
    console.log(balance);
}).catch((e) => {
    console.error(e);
};
```

### Get transaction by hash
```js
firma.tx.getTransactionByHash(txHash).then((tx) => {
    console.log(tx)
}).catch((e) => {
    console.error(e);
});
```

### Create Message (MsgSend) & StdTx
```js
const {MsgSend, StdTx} = require('@firmachain/firma-js');
const msg = new MsgSend(fromAddress, toAddress, (1 * 10 ** 6)); //send 1 FIRMA to toAddress
const stdTx = new StdTx(msg);
```

### Calculate gas
```js
const gasAdjustment = 2;
firma.tx.estimateGas(stdTx, gasAdjustment).then((fee) => { 
    // return Fee object
    stdTx.setFee(fee);
}).catch((e) => {
    console.log(e);
});
```

### Sign Transaction & Broadcast Transaction
```js
const {Wallet} = require('@firmachain/firma-js');
const wallet = Wallet.fromPrivateKey(privateKey);

firma.signStdTx(stdTx, wallet).then((tx) => {
    firma.tx.broadcast(tx).then((result) => {
      console.log('result', result);
    }).catch((e) => {
      console.log(e);
    });
}).catch((e) => {
    console.log(e);
});
```

### Shortcut of sign transaction
```js
firma.createAndSign(wallet, msg).then((signedTx) => {
    firma.tx.broadcast(signedTx).then(console.log)
})
```

### Mint NFT
```js
// MintNFT msg
// image, tokenURI, description are metadata
const msg = new MsgMintNFT("f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b", testAccount.accAddress, 'https://ipfs.infura.io:5001/api/v0/cat?arg=QmfWVHyTiVXscS4kHENQRXKD5ug1qd2UQJAE6aCX5ch2Eq', "test description", "https://ipfs.infura.io:5001/api/v0/cat?arg=QmTF7NerdGZhnDPJj3Yj51gqH18o8kLtgkgtVjMLk1V9tx");

firma.createAndSign(wallet, msg).then((signedTx) => {
    firma.tx.broadcast(signedTx).then(console.log)
}).catch(console.error)

```

### Transfer NFT
```js
// TransferNFT msg
const msg = new MsgTransferNFT("f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b", testAccount.accAddress, 'firma1rhfahdeh2f644f8mjeclyzp2jn9cshs0md8z5a');

firma.createAndSign(wallet, msg).then((signedTx) => {
    firma.tx.broadcast(signedTx).then(console.log)
}).catch(console.error);
```


### Burn NFT
```js
// BurnNFT msg
const msg = new MsgBurnNFT("f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b", testAccount.accAddress);

firma.createAndSign(wallet, msg).then((signedTx) => {
    firma.tx.broadcast(signedTx).then(console.log)
}).catch(console.error);

```



## License
MIT
[See LICENSE](https://github.com/FirmaChain/firma-js/blob/main/LICENSE)
