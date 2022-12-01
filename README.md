# Fleek Contracts

**The repository for Fleek smart contracts**

> 🚧 IMPORTANT 🚧 - This initiative is under development, so this repo should be treated as WIP. The goals and roadmap might change as the project is shaped up.

## ⚡ Overview

This is the landing point for Fleek's initiative to implement infrastructure as Solidity contracts.

The vision is to have this on a suitable L2 or L3 based on EVM so there is flexibility in terms of which chains to work with. And we can create a network of smart contracts that represent the different parts of your stack.

The goal is to be a more verifiable and crypto-friendly Serverless.yaml or Cloudformation manifests.

Get more information about the project on our [wiki](https://github.com/FleekHQ/contracts/wiki).

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

## 🙏 Contributing

This is an open source initiative! Any new idea is welcome, if you want to help us to improve the project please checkout [the contributing guide](/CONTRIBUTING.md).

## 📜 License

Fleek Contracts is released under the [MIT License](LICENSE).
