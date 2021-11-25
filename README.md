

## Requirements

* node 

For Mac:
```sh
brew install node
```

## Build steps

```sh
git clone https://github.com/zhoujia6139/DepositDataCreator.git
cd DepositDataCreator
npm install
```

## Using
1. encode data
```sh
node ./index.js encode 1000000000 0xc8747e914cDFCB722ce995a8953e7cf5692dBDc0
```

2. decode data
```sh
node ./index.js decode 0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000014c8747e914cDFCB722ce995a8953e7cf5692dBDc0
```