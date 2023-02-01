# The Graph Integration

This directory contains all documents and files related to the NFA x The Graph integration.

## What is the Graph?

Per the official documentation:

> The Graph is a decentralized protocol for indexing and querying data from blockchains, starting with Ethereum. It makes it possible to query data that is difficult to query directly.

In short, the Graph offers its users a flexible and almost instantaneous way to query data from blockchains with the integration of subgraphs.

Subgraphs are APIs that can be queried with a standard GraphQL API. Each subgraph's manifest describes the data structure of contracts of interest and how they should be indexed. The current directory contains the subgraph implementation for the Fleek NFA contract.

## Directory Structure

All of the files and directories except one are generated by the `graph-cli` package (as you will learn in the next section) based on the current live version of the contract on Polygon's mumbai testnet.

**Directories:**

- abis: contains all ABIs related to all contracts of interest in the subgraph with their JSON format. These ABI files are all generated based on the verified version of the contract on the blockchain.
- build: contains the latest build of the subgraph with its WASM (which is ignored in the repository). This folder is uploaded to IPFS during deployment.
- generated: contains the actual TypeScript implementation of the subgraph with the TS version of the graphql schema. The TS file in the `src` folder uses the TS implementation from here to function. `schema.ts` is the TypeScript version of the graphql schema and the `FleekNFA/FleekNFA.ts` includes the TS wrappers for all entities and events.
- [src](./src/): contains the TypeScript implementation of the handlers of the subgraph for events. These handlers process every new event and store them in the database.
- [tests](./tests/): contains the unit tests for this subgraph. For this purpose, `matchstick` (a unit testing framework by LimeChain) is used.
- [examples](./examples): contains examples for the subgraph.
- [examples/query](./examples/query) is the only directory that is not generated by the `graph-cli` package. You can find a working implementation of the `graphclient` along with a few queries there. For more information please check the [readme](./query-examples/README.md) for the examples.

**Files:**

- [networks.json](./networks.json): stores a list of the live versions of the contracts and their addresses on each chain they are deployed to.
- [package.json](./package.json): a typical package.json file with commands to simplify working with the `graph-cli`.
- [schema.graphql](./schema.graphql): the schema of all events, types, and structs we want to index in our subgraph.
- [subgraph.yaml](./subgraph.yaml): the description of the subgraph with the list of events, paths to ABIs and the schema, information on the network of the subgraph, etc...
- [tsconfig.json](./tsconfig.json): the TypeScript config file in the project.
- [yarn.lock](./yarn.lock): Yarn's auto-generated lock file for keeping track of the exact versions of the packages that were used to run the code.

## Build and deployment

In order to deploy the subgraph, a live deployed instance of the contract is needed. If you are not already familiar with deploying contracts, you can follow the guide [here](https://github.com/fleekxyz/non-fungible-apps/tree/main#-deployment).

When the contract is live, you can use the commands that are described in the `package.json` file to interact with the subgraph (build, deploy, test). But before doing so, please make sure you have the `graph-cli` package installed on your machine:

```bash
# If you want to use yarn:
$ yarn global add @graphprotocol/graph-cli
# If you want to use npm:
$ npm install -g @graphprotocol/graph-cli
```

### Developing the subgraph

If the contract has been through changes and those changes have resulted in a new ABI, the developer should make sure that the subgraph is updated as well to match the new interfaces.

To do so, both `schema.graphql` and `subgraph.yaml` files need to be updated.

The developer should also update the auto-generated TS files by running `yarn codegen` after updating the schema and the subgraph config files. That command changes the TS files in the `generated` directory, and that affects the [fleek-nfa.ts](./src/fleek-nfa.ts) file.

So, the next step is to update the handlers and review them again before doing the final build. Change the code based on the new interfaces and the new requirements as needed.

### Building the subgraph

To build the subgraph, you can simply run the `yarn build` or `npm run build` commands. Under the hood, these commands use the `graph-cli` package to build the new schemas and config files of the subgraph. This is an essential step to do before deploying the subgraph.

### Deploying the subgraph

The Graph offers two hosting services to its clients: The Graph Network, and the Hosted Service.

The Graph Client is only live on Ethereum at the time of writing and although there is a planned sunsetting of the Hosted Service for the Q1 of 2023, it is still our only choice to deploy our subgraph to networks other than Ethereum mainnet. According to the blog post about the sunsetting plan by the Graph, no more deployments are supported after the Q3 of 2022, but at the time of writing it is still possible to deploy subgraphs to the hosted service.

Before using the command line to push and deploy the subgraph to the Hosted Service, you should first create a subgraph on [their website](https://thegraph.com/hosted-service). After creating a subgraph there, you should copy the access token. ___Remember your access token is private and you should never share it with anyone else.___

Now that everything is set, you can simply deploy the subgraph to the Hosted Service by running this command (remember to replace the access token and the github_username/subgraph_name parts):

`graph deploy --product hosted-service --deploy-key YOUR_ACCESS_TOKEN --version-lable v0.0.1 YOUR_GITHUB_USERNAME/SUBGRAPH_NAME_ON_HOSTED_SERVICE`

After the deployment, the Hosted Service will start indexing all data relevant to your subgraph from the genesis block until the latest block on the chain. This will take some time and if your contract already has a lot of transactions and events emitted, it is going to take even more time to index all of those events. You should see the status of your subgraph has changed to `Synced` when all of the blocks are processed.

## Initialization

In order to initialize a new subgraph, you are going to need the `graph-cli` package. If you do not have this package already installed on your machine, please refer to the **Build and deployment** section and after installing it, continue reading this section of the readme.

To create a new subgraph from scratch and initialize it, you should have a deployed live version of your contract(s) on a chain (in this case mumbai).

The `graph-cli` command to init a subgraph is included below, please make sure you change all of the fields that are written in capital. If you do not want to deploy your subgraph to mumbai, change that with the name of the chain you want to deploy to:

`graph init --contract-name CONTRACT_NAME --index-events --studio --from-contract CONTRACT_ADDRESS --abi PATH/TO/ABI/JSON --network mumbai SUBGRAPH_NAME`

## Re-deployment

If a change is needed in the subgraph, you should update the `schema.graphql` and `subgraph.yaml` files to match the new changes that have happened on the contract side.

A typical re-deployment consists of a new contract address, ABI, and finally entities.

### Updating the addresses

To update the address of the contract, the following files need to be changed:

- [networks.json](./networks.json): update the address for the right blockchain network
- [subgraph.yaml](./subgraph.yaml): update the address in `dataSources.source.address`

### Updating the entities and handlers

It is important to make sure the subgraph is going to support the new version of the entities by updating the `schema.graphql` file.

Define the new entities and the relationships between them. Also, take care of entities that should be removed from the schema.

If your contract is emitting new events, update the `subgraph.yaml` file's `dataSources.mapping.eventHandlers`. Remove events that are not a part of the new contract.

### Re-generating the TS files

To re-generate files in `generated/` you can simply run `yarn codegen` or `npm run codegen` only and only **after** the previous two steps. If you do it before, you will still need to redo it later.

### Update the handlers

If you need new handlers in your code, you should update the `./src/fleek-nfa.ts` file and create functions to handle new events.

**NOTE: The name of your handler functions should be exactly the same as the name you have specified in the `subgraph.yaml` file for the target event.**

### Generate a new build

Finally, you can generate the build that is going to be deployed to the Hosted Service by running `yarn build` or `npm run build`.

### Re-deployment

The command that should be used for re-deployment purposes is no different than the one that is used to deploy subgraphs in the first place (remember to replace the access token and the github_username/subgraph_name parts):

`graph deploy --product hosted-service --deploy-key YOUR_ACCESS_TOKEN --version-lable v0.0.1 YOUR_GITHUB_USERNAME/SUBGRAPH_NAME_ON_HOSTED_SERVICE`

## Testing

You can run the unit tests found in `./tests/` with `yarn test` or `npm run test`.