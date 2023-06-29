
# Non-Fungible Apps - by Fleek

> 🚧 IMPORTANT 🚧 - This initiative is under development, so this repo should be treated as a WIP. The goals and the roadmap might change as the project is shaped.

## ⚡ Overview

This is the landing point for our initiative to decentralize web3 app frontend infrastructure, their distribution, and access, through Non-fungible Applications, an NFT-based implementation.

**The goal of NFAs** is to put web3 application frontends on-chain to provide users with a verifiable and crypto-friendly way of accessing applications.

1. Developers mint their app's frontend onto an NFT, where the frontend bundle is stored and referenced from IPFS.
2. Users mint prints of the NFA, which allows them to have a decentralized and permanently on-chain access point to any web3 app.
3. Users can load said apps without relying on DNS, for example, locally via the browser or through a potentially integrated wallet.

We want to have chain and wallet agnostic standard. While we use ERC-721 as a base reference, the base idea is to be kept simple, with extenesions/modules separate, so that NFAs can be easily replicable in any comparable chain, language, or NFT standard.

We've developed a base set of contract code so now we want to harden it as well as add more metadata and features to support the additions of new modules - So be sure to open issues or PRs, as we welcome all contributions and collaborations!


## ⌨️ Developing

### 📁 Project Structure

Inside the root folder you are going to find:
- [contracts](./contracts): All the developed contracts
- [subgraph](./subgraph): The Graph project related code
- [serverless](./serverless): The serverless and Mongo/Prisma set-up
- [ui](./ui): A web application to interact with deployed contracts

You can see breakdowns of other folders in the README within those folders.

### Contracts

Within the project is the contracts folder which houses the contracts, utils, tests, and deployment scripts associated with the Solidity smart contracts. Check the [contracts readme](./contracts/README.md) for more info.

### Subgraph

To index data off-chain, we use TheGraph and this section is the code required for our subgraph. Check the [subgraph readme](./subgraph/README.md) for more info.

### Serverless

For verification purposes and our off-chain stack, we are using a MongoDB instance integrated with Prisma and serverless handlers. Check the [serverless readme](./serverless/README.md) for more info.

### User Interface (UI)

Within the project is included a [React](https://reactjs.org/) web application to expose and test the interaction with deployed scripts. Check the [UI readme](./ui/README.md) for more info.

### 💅 Code Styling

For code formatting, we are using [Prettier](https://prettier.io/) and following the [styling guide from Solidity documentation](https://docs.soliditylang.org/en/v0.8.16/style-guide.html). For formatting the code you can run:

```
$ yarn format
```

> ⚠️ Please make sure you are following the code styling guide before pushing the code

## 🛣️ Development Roadmap

Our goal is to reach a point where trustable Solidity contracts can be used for identifying properly the data about web3 applications. Within that goal, we want to also provide ways for users to organize and list information about their applications. To get at this we are currently starting with:

- Define trustable and extendable smart contracts and standards
- Prove how the concept would be applied using static sites
- Prove the minting and copy-mint flow for these contracts

Later on, when the initiative proves its value, a service will be added to Fleek's platform in a friendly way for anyone to be able to get their applications onboard.

## 📚 Dependency Highlights

We use the following libraries to develop Fleek Non-Fungible Apps

- [Eslint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [Ethers](https://docs.ethers.io/v5/)
- [Foundry](https://book.getfoundry.sh/)
- [Hardhat](https://hardhat.org/)
- [Open Zeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev/)

## 🙏 Contributing

This is an open-source initiative! Any new idea is welcome, if you want to help us to improve the project please check out [the contributing guide](/CONTRIBUTING.md).

## 📜 License

Fleek Non-Fungible Apps is released under the [MIT License](LICENSE).

## 🐛 Bug reporting

If you have found a bug to report, please create an [issue](https://github.com/fleekxyz/non-fungible-apps/issues). Thank you!
