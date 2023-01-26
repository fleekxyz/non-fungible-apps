# Query Examples

This directory contains a TypeScript app that performs queries on the deployed subgraph instance of the Fleek NFA.

## How to run

### Prerequisites

In order to run the app, the following dependencies are required:

- yarn
- NPM
- ts-node

### Running the TypeScript app

To launch the TypeScript app, you need to install all dependencies that come with it: `yarn` or `npm install`

After doing so, you can run the app by executing the following command: `npx ts-node main.ts`

## Tweaking the queries

As previously mentioned, all queries' GraphQL form can be found in the [queries.graphql](./queries.graphql) file.

By following [The Graph's Querying Documentation](https://thegraph.com/docs/en/querying/graphql-api/), you can change the queries or add new ones as you desire.

The next thing you need to do after changing the file, is generating the TypeScript format of them by running the following commands:

```sh
# if you already have graphclient installed, skip the first command.
yarn add -D @graphprotocol/client-cli
yarn graphclient build
```

After generating the new TypeScript query specification files, you can change the [main.ts](./main.ts) script to execute the new queries.