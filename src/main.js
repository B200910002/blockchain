const { BlockChain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate('9d2ae321496d68f58ee47a046a4d17419cbe480f109cb7f6f9644412f4a5895c')
const myWalletAddress = myKey.getPublic('hex')

const yourKey = ec.keyFromPrivate('531fabf191ac198e250cbf46270a9c40b7f0a014bc831db37b700558924430b6')
const yourWalletAddress = yourKey.getPublic('hex')

let coin = new BlockChain();
coin.difficulty = 4;

console.log("\nstart mining...");
coin.minePendingTransactions(myWalletAddress);
console.log("\nstart mining...");
coin.minePendingTransactions(yourWalletAddress);

const tx1 = new Transaction(myWalletAddress, yourWalletAddress, 20)
tx1.signTransaction(myKey)
coin.addTransaction(tx1)

const tx2 = new Transaction(yourWalletAddress, myWalletAddress, 10)
tx2.signTransaction(yourKey)
coin.addTransaction(tx2)

console.log("\nstart mining...");
coin.minePendingTransactions(myWalletAddress);

// console.log("\nstart mining...");
// coin.minePendingTransactions(yourWalletAddress);

console.log("\nmy wallet: " + coin.getBalanceOfAddress(myWalletAddress));
console.log("\nyour wallet: " + coin.getBalanceOfAddress(yourWalletAddress));
// console.log("block chain is valid:" + coin.isChainValid())
// console.log("\n"+JSON.stringify(coin.chain,null,4))