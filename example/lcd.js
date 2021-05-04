const {Firma} = require('../dist');
const testAccount = require('./test_account.json');

const chainId = 'test';
const lcdUrl = 'http://localhost:1317';

// Init LCD
const firma = new Firma(chainId, lcdUrl);

// get account info
firma.account.getAccount(testAccount.accAddress).then(console.log);

// get firma balance
firma.account.getBalance(testAccount.accAddress).then(console.log);

// get latest block number
firma.blockchain.getBlockNumber().then(console.log);

// get transaction by hash
firma.tx.getTransactionByHash('F77D859A7479580E636AE988F568E1E5A9791335B3EA66EC976D1CCE4F40473D').then(console.log);

