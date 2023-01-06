const { BlockChain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate('9d2ae321496d68f58ee47a046a4d17419cbe480f109cb7f6f9644412f4a5895c')
const myWalletAddress = myKey.getPublic('hex')

const batKey = ec.keyFromPrivate('531fabf191ac198e250cbf46270a9c40b7f0a014bc831db37b700558924430b6')
const batWalletAddress = batKey.getPublic('hex')

const boldKey = ec.keyFromPrivate('bd4296a3f48859107072afd69965c932b6b2fa1d130335d85424ad8400f92b1c')
const boldWalletAddress = boldKey.getPublic('hex')

let coin = new BlockChain();
coin.difficulty = 1;

for(let i=0;i<10;i++){
    for(let j=0;j<10;j++){
        const tx1 = new Transaction(batWalletAddress, boldWalletAddress, 1000)
        tx1.signTransaction(batKey)
        coin.addTransaction(tx1)

        const tx2 = new Transaction(boldWalletAddress, batWalletAddress, 500)
        tx2.signTransaction(boldKey)
        coin.addTransaction(tx2)
    }
    console.log("\nstart mining...");
    coin.minePendingTransactions(myWalletAddress);
}

console.log("\nmy wallet: " + coin.getBalanceOfAddress(myWalletAddress));
console.log("\nBat wallet: " + coin.getBalanceOfAddress(batWalletAddress));
console.log("\nBold wallet: " + coin.getBalanceOfAddress(boldWalletAddress));
console.log("\nblock chain is valid: " + coin.isChainValid())
// console.log("\n"+JSON.stringify(coin.chain,null,4))