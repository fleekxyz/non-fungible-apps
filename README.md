# Fleek Contracts

**The repository for Fleek smart contracts**

> 🚧 IMPORTANT 🚧 - This initiative is under development, so this repo should be treated as WIP. The goals and roadmap might change as the project is shaped up.

## ⚡ Overview

This is the landing point for Fleek's initiative to implement infrastructure as Solidity contracts.

The vision is to have this on a suitable L2 or L3 based on EVM so there is flexibility in terms of which chains to work with. And we can create a network of smart contracts that represent the different parts of your stack.

The goal is to be a more verifiable and crypto-friendly Serverless.yaml or Cloudformation manifests.

Get more information about the project on our [wiki](https://github.com/FleekHQ/contracts/wiki).

## ⌨️ Developing

### 📁 Project Structure

Inside the folder you are going to find different folders:

- [/contracts](/contracts): all the developed contracts
- [/interfaces](/interfaces): interfaces used by contracts
- [/scripts](/scripts): any utility scripts used for contracts
- [/test](/test): tests suits to validate contracts
- [/ui](/ui): a web application to interact with deployed contracts

### 📄 Contracts

The contracts present in this project are based in [Solidity](https://github.com/ethereum/solidity) and it uses [Node.js](https://nodejs.org/) for running scripts and [yarn](https://yarnpkg.com/) to keep dependencies management.

> ⚠️ Before starting developing make sure you Solidity, Node.js and yarn correctly installed in your environment

Follow the steps:

1. Clone the repo, [check out how here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

2. Install the dependencies:

   ```bash
   $ yarn
   ```

3. Compile the contracts to make sure everything is correct:

   ```bash
   $ yarn compile
   ```

   The output should looks like:

   ```bash
   yarn run v1.22.19
   $ hardhat compile
   Compiled 24 Solidity files successfully
   Done in 1.23s.
   ```

4. Now you are able to make your code changes in the project. To help with Solidity, check [the language references](https://docs.soliditylang.org/).

### ✅ Testing Contracts

The project is covered with test suits that must pass to guarantee code integrity. To run the test suits:

1. Make sure that you have the dependencies installed:

   ```
   $ yarn
   ```

2. Run:

   ```
   $ yarn test
   ```

   The output should finish looking like:

   ```
   ...

     15 passing (3s)

   Done in 4.25s.
   ```

> ⚠️ Please make sure to update tests as appropriate before pushing code

### 💅 Code Styling

For code formatting we are using [Prettier](https://prettier.io/) and following the [styling guide from Solidity documentation](https://docs.soliditylang.org/en/v0.8.16/style-guide.html). For formatting the code you are able to run:

```
$ yarn format
```

> ⚠️ Please make sure you are following the code styling guid before pushing code

## 🛣️ Roadmap

Our goal is to reach a point where trustable Solidity contracts can be used for identifying properly the data about web3 applications. Within that goal, we want to also provide ways for users to organize and list information about their application. To get at this we are currently starting with:

- Define trustable and extendable smart contracts and standards
- Prove how the concept would be applicable using static sites

Later on, when the initiative prove its value, a service will be added to Fleek's platform in a friendly way for anyone be able to get their applications onboard.

## 💡 Proof of concept

The proof of concept is being a work in progress and you can reach more information [here](https://github.com/FleekHQ/contracts/wiki/Proof-of-Concept). Mainly the concept approached with this initiative will be proven through:

### Basic contracts structure:

The first goal is create a contract extended from [ERC721](https://eips.ethereum.org/EIPS/eip-721) to store metadata about the static sites minted and bind them together with their URI (e.g. IPFS hash) and the application building history. The contract should be able to:

- Mint sites
- Upgrade sites
- Store site metadata fields
- Store site repository and building history
- Access levels for collection owner/controllers and token owner/controllers
- Any other function extended from ERC721
- All tokens be correctly presentable on [OpenSea](https://opensea.io/) and others marketplaces

### Minimal UI

It is going to be provided a minimal user interface for interacting with the created sites contract. The UI should have:

- Site minting
- Site updating
- Site preview and link

Also is important that the collection were able to be shown on [OpenSea](https://opensea.io/).

### Admin commands

The project should provide a way for interacting with the contract as owner with CLI.

<!-- We should add the commands here when they are done -->

## 🙏 Contributing

This is an open source initiative! Any new idea is welcome, if you want to help us to improve the project please checkout [the contributing guide](/CONTRIBUTING.md).

## 📜 License

Fleek Contracts is released under the [MIT License](LICENSE).
