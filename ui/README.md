## ⚡ Overview

Minimal UI to interact with the contract, build with [React](https://reactjs.org/). It will allow you to:

- Mint your site
- List the minted sites
- View the details of the minted site

### ⚙️ Requirements

You'll need to have [nodejs](https://nodejs.org/en/) and [YARN](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed. Please do not use NPM for package installation

### 🖥️ Running

To run the UI localy follow the steps:

1. Clone the repo, [check out how here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

2. Install the dependencies:

   ```bash
   $ yarn
   ```

3. Start the local server running the app:

   ```
   $ yarn dev
   ```

   Now a local server should be running on [http://localhost:5173](http://localhost:5173).


### 🤖 Build public
As we use vite, to build a public distribution for production run:

```
vite build
```

This will create a dist folder where 