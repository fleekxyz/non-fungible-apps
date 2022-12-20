# Fleek Contracts

**The repository for Fleek smart contracts**

> 🚧 IMPORTANT 🚧 - This initiative is under development, so this repo should be treated as WIP. The goals and roadmap might change as the project is shaped up.

## ⚡ Overview

This is the landing point for Fleek's initiative to implement infrastructure as Solidity contracts.

The vision is to have this on a suitable L2 or L3 based on EVM so there is flexibility in terms of which chains to work with. And we can create a network of smart contracts that represent the different parts of your stack.

The goal is to be a more verifiable and crypto-friendly Serverless.yaml or Cloudformation manifests.

Get more information about the project on our [wiki](https://github.com/fleekxyz/contracts/wiki).

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

The project is covered with test suits (Foundry & Hardhat) that must pass to guarantee code integrity.

**HardHat tests**

All HardHat tests are located at [this directory](../test/).

1.  Make sure that you have the dependencies installed:

    ```
    $ yarn
    ```

2.  Run:

    ```
    $ yarn test:hardhat
    ```

    The output should finish looking like:

    ```
    ...

    15 passing (3s)

    Done in 4.25s.
    ```

**Foundry tests**

All Forge tests are located at [this directory](../test/foundry/).

In order to run them, you need to have Forge by Foundry installed on your machine (check [this](https://book.getfoundry.sh/getting-started/installation.html) installation guide).

It is also required for you to have [forge-std](https://github.com/foundry-rs/forge-std/tree/cd7d533f9a0ee0ec02ad81e0a8f262bc4203c653) in your `./lib/` directory.

After installing Foundry and its components, you can simply run in the root directory:

```
$ yarn test:foundry
```

It is going to execute all test cases that are described in the [/test/foundry](test/foundry/) directory.

### Running Both Test Environments

Alternatively, you can run both test environments by executing:

```
$ yarn test
```

> ⚠️ Please make sure to update tests as appropriate before pushing code

### Deployment

This guide contains instructions to deploy the contract on three networks. If the execution is successful, you will see the contract address on your screen at the end of the instructions.

**Hardhat Local Network**

HardHat offers a local testnet environment that allows users and testers to deploy and interact with contracts without the need to contact external APIs and endpoints.

To start your local HardHat network, you need to run a node first. It is important to not terminate the command before proceeding with the instructions:

```
$ yarn hh:node
```

To deploy the contract on the HardHat network, execute:

```
$ yarn deploy:local
```

If the execution is successful, you will see the contract address on your screen.

**Polygon Mumbai Testnet**

To deploy the contract on the testnet, you have to first export your wallet's private key and update the `.env.example` file at the root directory of this repository.

The [.env.example](./.env.example) file needs to be renamed to `.env` before continuing. Make sure you are using your private API URL, if you have one.

After updating the `.env` file, you can run:

```
$ yarn deploy:mumbai
```

to deploy the contract on the testnet. Please note that your wallet needs to hold enough Mumbai MATIC for the deployment to be successful.

<!-- TODO: add this section after the mainnet setup is done and tested
**Polygon main-net**

To deploy the contract on the testnet, you have to first export your wallet's private key and update the `.env.example` file at the root directory of this repository.

The [.env.example](./.env.example) file needs to be renamed to `.env` before continuing. Make sure you are using your private API URL, if you have one.

After updating the `.env` file, you can run:

```
yarn deploy:mainnet
```

to deploy the contract on the testnet. Please note that your wallet needs to hold enough Mumbai MATIC for the deployment to be successful.
-->

### 🖥️ User Interface

Within the project is included a [React](https://reactjs.org/) web application to expose and test the interaction with deployed scripts. To run it:

1. Get in the `/ui` folder:

   ```
   $ cd ui
   ```

2. Install the UI dependencies:

   ```
   $ yarn
   ```

3. Start the local server running the app:

   ```
   $ yarn dev
   ```

   Now a local server should be running on [http://localhost:5173](http://localhost:5173).

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

The proof of concept is being a work in progress and you can reach more information [here](https://github.com/fleekxyz/contracts/wiki/Proof-of-Concept). Mainly the concept approached with this initiative will be proven through:

### **Basic contracts structure:**

The first goal is create a contract extended from [ERC721](https://eips.ethereum.org/EIPS/eip-721) to store metadata about the static sites minted and bind them together with their URI (e.g. IPFS hash) and the application building history. The contract should be able to:

- Mint sites
- Upgrade sites
- Store site metadata fields
- Store site repository and building history
- Access levels for collection owner/controllers and token owner/controllers
- Any other function extended from ERC721
- All tokens be correctly presentable on [OpenSea](https://opensea.io/) and others marketplaces

### **Minimal UI**

It is going to be provided a minimal user interface for interacting with the created sites contract. The UI should have:

- Site minting
- Site updating
- Site preview and link

Also is important that the collection were able to be shown on [OpenSea](https://opensea.io/).

### **Admin commands**

The project should provide a way for interacting with the contract as owner with CLI.

> 🛠️ Work in progress...

<!-- TODO: add the commands here when they are done -->

### **Interaction script examples**

Right away, in the [/scripts](/scripts/) folder you are able to see some scripts that will help you to interact with deployed contracts. By default you are able to select `localhost`, `hardhat` or `mumbai` network name predefined on [hardhat.config.ts](/hardhat.config.ts). The scripts will be using the deployment information stored in the [/deployments](/deployments/) folder. You should have a nested folder for each of the networks you have deployed it. The scripts needs be run using the Hardhat environment following the pattern:

```bash
# Replace <script_name> with the selected script
# Replace <network_name> with the selected network
$ npx hardhat run scripts/<script_name>.js --network <network_name>
```

> 💡You are able to see and change the arguments for each script at the top of each file

## 🙏 Contributing

This is an open source initiative! Any new idea is welcome, if you want to help us to improve the project please checkout [the contributing guide](/CONTRIBUTING.md).

## 📜 License

Fleek Contracts is released under the [MIT License](LICENSE).
