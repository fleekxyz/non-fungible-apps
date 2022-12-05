# Fleek Contracts Interaction Guide

This guide assists you with the process of deploying, testing, and interacting with the FleekERC721 contract.

Prerequisites: git, yarn, node, npm

## Initialization

In order to deploy the contract on the desired network, you should first clone the repository and install all dependencies by executing these commands in your command line:

```sh
$ git clone git@github.com:FleekHQ/fleek_contracts.git
$ cd fleek_contracts
$ yarn
```

## Deployment

This guide contains instructions to deploy the contract on three networks. If the execution is successful, you will see the contract address on your screen at the end of the instructions.

### Polygon Mumbai Testnet

To deploy the contract on the testnet, you have to first export your wallet's private key and update the `.env.example` file at the root directory of this repository.

The [.env.example](../.env.example) file needs to be renamed to `.env` before continuing. Make sure you are using your private API URL, if you have one. 

After updating the `.env` file, you can run `npm run deploy:mumbai` to deploy the contract on the testnet. Please note that your wallet needs to hold enough Mumbai MATIC for the deployment to be successful.

### Hardhat Local Network

HardHat offers a local testnet environment that allows users and testers to deploy and interact with contracts without the need to contact external APIs and endpoints.

To start your local HardHat network, you need to run a node first. It is important to not terminate the command before proceeding with the instructions: `npm run hh:node`

To deploy the contract on the HardHat network, execute `npm run deploy:local`. If the execution is successful, you will see the contract address on your screen.

### Polygon main-net

To deploy the contract on the testnet, you have to first export your wallet's private key and update the `.env.example` file at the root directory of this repository.

The [.env.example](../.env.example) file needs to be renamed to `.env` before continuing. Make sure you are using your private API URL, if you have one. 

After updating the `.env` file, you can run `npm run deploy:mainnet` to deploy the contract on the testnet. Please note that your wallet needs to hold enough Mumbai MATIC for the deployment to be successful.
