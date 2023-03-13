# Fleek Non Fungible Apps

**The repository for Fleek Non Fungible Apps project**

> 🚧 IMPORTANT 🚧 - This initiative is under development, so this repo should be treated as a WIP. The goals and the roadmap might change as the project is shaped.

## ⚡ Overview

This is the landing point for Fleek's initiative to implement infrastructure as Solidity contracts.

The vision is to have this on Ethereum Mainnet. We can create a network of smart contracts that represent the different parts of your stack. We had previously targeted Polygon but have changed it to Ethereum Mainnet for better interoperability and the security that mainnet provides.

The goal is to be a more verifiable and crypto-friendly Serverless.yaml or Cloudformation manifests that will enable us to develop use cases on top like community hosting.

We've developed a base set of contract code so now we want to harden it as well as add more metadata and features to support use cases with the first use case being community hosting. So be sure to check out the roadmap on the wiki.

You can find the wiki [here](https://github.com/fleekxyz/non-fungible-apps/wiki) for more information about the project.

## ⌨️ Developing

### 📁 Project Structure

Inside the root folder you are going to find:
- [contracts](./contracts): all the developed contracts
- [subgraph](./subgraph): The Graph project related code
- [ui](./ui): a web application to interact with deployed contracts

You can see breakdowns of other folders in the README within those folders.

### Contracts

Within the project is the contracts folder which houses the contracts, utils, tests and deployment scripts associated with the Solidity smart contracts. Check the [contracts readme](./contracts/README.md) for more info.


### 🖥️ User Interface

Within the project is included a [React](https://reactjs.org/) web application to expose and test the interaction with deployed scripts. Check the [UI readme](./ui/README.md) for more info.

### Subgraph

In order to index data offchain, we use TheGraph and this section is the code required for our subgraph. Check the [subgraph readme](./subgraph/README.md) for more info.

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
- Prove community hosted apps via these contracts

Later on, when the initiative prove its value, a service will be added to Fleek's platform in a friendly way for anyone be able to get their applications onboard.

## 💡 Proof of concept

The proof of concept was concluded last year and you can reach more information [here](https://github.com/fleekxyz/non-fungible-apps/wiki/%F0%9F%92%A1-Proof-of-Concept).

## 📚 Dependency Highlights

We use the following libraries to develop Fleek Non Fungible Apps

- [Eslint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [Ethers](https://docs.ethers.io/v5/)
- [Foundry](https://book.getfoundry.sh/)
- [Hardhat](https://hardhat.org/)
- [Open Zeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev/)

## 🙏 Contributing

This is an open source initiative! Any new idea is welcome, if you want to help us to improve the project please checkout [the contributing guide](/CONTRIBUTING.md).

## 📜 License

Fleek Non Fungible Apps is released under the [MIT License](LICENSE).

## 🐛 Bug reporting

If you have found a bug to report, please create an [issue](https://github.com/fleekxyz/non-fungible-apps/issues). Thank you!
