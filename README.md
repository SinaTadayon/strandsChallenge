# Linea Testnet Sample Contract
This is a simple project to transfer any ERC20 token and ETH coin on the Linea testnet network. It's based on the Hardhat and Foundry frameworks.

## Installation
1. Clone this repository:
```console
git clone https://github.com/SinaTadayon/strandsChallenge.git 
```

2. Install NPM packages:
```console
cd strandsChallenge
yarn install
``` 

## Run tests:
```console
yarn test:forge
```

## Run deploy:
- local network
```console
yarn deploy:local
```
- linea testnet network
```console
yarn deploy:linea
```
## Run verify:
- linea network
```console
yarn verify --network linea CONTRACT_ADDRESS
```

## Author

This example implementation was written by Sina Tadadyon.

## License

MIT license. See the license file.
Anyone can use or modify this software for their purposes.
