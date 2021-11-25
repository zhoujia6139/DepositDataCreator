const Web3 = require('web3');

let Web3Instance = new Web3();

function encodeDepositData(
    tokenAmount,
    recipientAddress,
) {
    return '0x' +
        Web3Instance.utils.padLeft(
            Web3Instance.utils.toHex(tokenAmount), 64,
        ).substr(2) + // Token amount or ID to deposit (32 bytes)
        Web3Instance.utils.padLeft(
            Web3Instance.utils.toHex(recipientAddress.length/2), 64,
        ).substr(2) + // len(recipientAddress)          (32 bytes)
        recipientAddress; // recipientAddress               (?? bytes)
}

function decodeDepositDate(depositData) {
    //Web3Instance.utils.bytesToHex()
    let result = Web3Instance.eth.abi.decodeParameters(['uint256', 'uint256'], depositData);
    let amount = result['0'];
    let addressLen = result['1'];
    let address = depositData.substr(128);
    if (address.length !== addressLen*2) {
        console.log("wrong format depositData");
        process.exit(1)
    }
    address = "0x" + address;
    //let address = Web3Instance.utils.bytesToHex(result['2']);
    console.log("amount = " + amount);
    //console.log("addressLen = " + addressLen);
    console.log("address = " + address);
}

let cmd = process.argv[2];
console.log("cmd = " + cmd);
let paramLen = process.argv.length;

if (cmd === "encode") {
    if (paramLen !== 5) {
        console.log("wrong param length for encode");
        process.exit(1)
    }
    let tokenAmount = process.argv[3];
    let recipientAddress = process.argv[4];
    console.log("tokenAmount = " + tokenAmount);
    console.log("recipientAddress = " + recipientAddress);
    if (recipientAddress.startsWith("0x")) {
        recipientAddress = recipientAddress.substr(2);
    }
    if (recipientAddress.length % 2 !== 0) {
        console.log("wrong format recipientAddress");
        process.exit(1)
    }
    let depositData = encodeDepositData(tokenAmount, recipientAddress);
    console.log("depositData is = " + depositData);
} else if (cmd === "decode") {
    if (paramLen !== 4) {
        console.log("wrong param length for decode");
        process.exit(1)
    }
    let depositData = process.argv[3];
    if (depositData.startsWith("0x")) {
        depositData = depositData.substr(2);
    }
    decodeDepositDate(depositData);
} else {
    console.error("invalid cmd param");
}