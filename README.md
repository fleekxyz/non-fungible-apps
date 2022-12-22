# Fleek Non Fungible Apps

**The repository for Fleek Non Fungible Apps project**

> 🚧 IMPORTANT 🚧 - This initiative is under development, so this repo should be treated as WIP. The goals and roadmap might change as the project is shaped up.

## ⚡ Overview

This is the landing point for Fleek's initiative to implement infrastructure as Solidity contracts.

The vision is to have this on a suitable L2 or L3 based on EVM so there is flexibility in terms of which chains to work with. And we can create a network of smart contracts that represent the different parts of your stack.

The goal is to be a more verifiable and crypto-friendly Serverless.yaml or Cloudformation manifests that will enable us to develop use cases on top like community hosting.

We've developed a base set of contract code so now we want to harden it as well as add more metadata and features to support use cases with the first use case being community hosting. So be sure to check out the roadmap on the wiki.

You can find the wiki [here](https://github.com/fleekxyz/non-fungible-apps/wiki) for more information about the project.

## ⌨️ Developing

### 📁 Project Structure

Inside the root folder you are going to find:

- [/contracts](/contracts): all the developed contracts
- [/deploy](/deploy): scripts used for deployment on different networks
- [/deployments](/deployments): resultant ABI and info for deployments (each network will have a nested folder)
- [/lib](/lib): external modules used by Foundry
- [/scripts](/scripts): any utility scripts used for interacting with deployed contracts
- [/test](/test): tests suits to validate contracts
- [/ui](/ui): a web application to interact with deployed contracts

And after running it locally some folders may be generated:

- `/artifacts`: ABIs and build info generated by Hardhat
- `/cache`: cache info used by Hardhat
- `/forge-cache`: cache info used by Foundry
- `/node_modules`: all dependencies for the Node.js environment
- `/out`: resultant ABIs for all contracts that has interactions

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
   Compiled 14 Solidity files successfully.
   Done in 0.98s.
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

    33 passing (1s)

    Done in 2.11s.
    ```

**Foundry tests**

All Forge tests are located at [this directory](../test/foundry/).

In order to run them, you need to have Forge by Foundry installed on your machine (check [this](https://book.getfoundry.sh/getting-started/installation.html) installation guide).

It is also required for you to have [forge-std](https://github.com/foundry-rs/forge-std/tree/cd7d533f9a0ee0ec02ad81e0a8f262bc4203c653) in your `./lib/` directory. In case you don't have it yet, you can run:

```
$ git submodule update --init --recursive
```

After installing Foundry and its components, you can simply run in the root directory:

```
$ yarn test:foundry
```

It is going to execute all test cases that are described in the [/test/foundry](test/foundry/) directory. Your output should looks like:

```
Test result: ok. 36 passed; 0 failed; finished in 4.06ms
Done in 0.58s.
```

### Running Both Test Environments

Alternatively, you can run both test environments by executing:

```
$ yarn test
```

> ⚠️ Please make sure to update tests as appropriate before pushing code

### 🚀 Deployment

This guide contains instructions to deploy the contract on three networks. If the execution is successful, you will see the contract address on your screen at the end of the instructions.

#### **Hardhat Local Network**

HardHat offers a local testnet environment that allows users and testers to deploy and interact with contracts without the need to contact external APIs and endpoints.

To start your local HardHat network, you need to run a node first. It is important to not terminate the command before proceeding with the instructions:

```
$ yarn node:hardhat
```

To deploy the contract on the HardHat network, execute:

```
$ yarn deploy:local
```

If the execution is successful, you will see the contract address on your screen.

#### **Polygon Mumbai Testnet**

To deploy the contract on the testnet, you have to first export your wallet's private key and update the `.env.example` file at the root directory of this repository.

The [.env.example](./.env.example) file needs to be renamed to `.env` before continuing. Make sure you are using your private API URL, if you have one.

After updating the `.env` file, you can run:

```
$ yarn deploy:mumbai
```

to deploy the contract on the testnet. Please note that your wallet needs to hold enough Mumbai MATIC for the deployment to be successful. To reach more in-depth information about how to deploy contract checkout [this guide](https://wiki.polygon.technology/docs/develop/alchemy).

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

### ▶️ Interaction scripts

Right away, in the [/scripts](/scripts/) folder you are able to see some scripts that will help you to interact with deployed contracts. By default you are able to select `localhost`, `hardhat` or `mumbai` network name predefined on [hardhat.config.ts](/hardhat.config.ts). The scripts will be using the deployment information stored in the [/deployments](/deployments/) folder. You should have a nested folder for each of the networks you have deployed it. The scripts needs be run using the Hardhat environment following the pattern:

```bash
# Replace <script_name> with the selected script
# Replace <network_name> with the selected network
$ npx hardhat run scripts/<script_name>.js --network <network_name>
```

> 💡You are able to see and change the arguments for each script at the top of each file

<!-- TODO: add the commands here when they are done
### Admin commands

The project should provide a way for interacting with the contract as owner with CLI.

> 🛠️ Work in progress...

-->

### 🖥️ User Interface

Within the project is included a [React](https://reactjs.org/) web application to expose and test the interaction with deployed scripts. Check the [UI readme](/ui/README.md) for more info

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

The proof of concept is being a work in progress and you can reach more information [here](https://github.com/fleekxyz/non-fungible-apps/wiki/%F0%9F%92%A1-Proof-of-Concept).

## 📚 Dependency Highlights

We use the following libraries to develop Fleek Non Fungible Apps

- [Chakra](https://chakra-ui.com/)
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
