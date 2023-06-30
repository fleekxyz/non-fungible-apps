## ⚡ Overview

Minimal UI to interact with the contract, build with [React](https://reactjs.org/). It will allow you to:

- Mint your site
- List the minted sites
- View the details of the minted site

### ⚙️ Requirements

You'll need to have [nodejs](https://nodejs.org/en/) and [YARN](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed. Please do not use NPM for package installation.

Also, don't forget to check the [Getting started section](https://github.com/fleekxyz/non-fungible-apps/wiki/%F0%9F%93%98-Getting-Started) on the wiki if you didn't do it yet, cause you need to configure your wallet to be able to mint a site.

### Setting Contract Address and ABI

The contract address and ABI is set by pointing `ui/src/integrations/ethereum/contracts/FleekERC721.json` to the file from the deployment outputs in the contract sub project.

This can be a local deployment or a deployment on one of the networks.  This maintains consistency between the deployed contracts and the info in the UI configuration.

### 🖥️ Running

To run the UI localy follow the steps:

1. Clone the repo, [check out how here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

2. Install the dependencies:

   ```bash
   $ yarn
   ```

   This also will generate the `.graphclient` folder. Every time you do a change on the queries files, you'll have to build again that folder, to do it run:

   ```bash
   $ yarn graphclient build
   ```

3. To use ConnecKit is neccessary get an [Alchemy ID](https://alchemy.com/), so create an App and get the credentials. Then set the following .env file

   ```bash
   VITE_ALCHEMY_API_KEY
   VITE_ALCHEMY_APP_NAME
   ```

   Also, you'll need to set up your firebase cretendials to make work the github login. Add to the .env file the following variables

   ```bash
   VITE_FIREBASE_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID
   VITE_FIREBASE_MEASUREMENT_ID
   ```

Get them from the project settings on the firebase dashboard. Read [this article](https://support.google.com/firebase/answer/7015592?hl=en#zippy=%2Cin-this-article) to know how to get your porject config

4. To interact with the contract, you need to set the Goerli RPC. Set this variable on the .env file

   ```bash
   VITE_GOERLI_RPC
   ```

5. Set the Bunny CDN endpoint and the Sign in Key needed to create the signature

   ```bash
   VITE_BUNNYCDN_URL
   VITE_FE_SIGNING_KEY
   ```

6. Start the local server running the app:

   ```bash
   $ yarn dev
   ```

   Now a local server should be running on [http://localhost:5173](http://localhost:5173).

### 🤖 Build public

As we use vite, to build a public distribution for production run:

```bash
$ vite build
```

This will create a dist folder for the deployment.

