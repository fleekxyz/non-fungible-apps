## NFA - Serverless

### Requirements

This sub-project of NFAs requires Node 18.  Specifically, this has been tested with 18.13.0 so far.

### Setup

After cloning the repo, ensure you run `yarn` in the root directory. After that, `cd` into the `serverless` directory and alsy run `yarn`.

If you are deploying, make sure you have your AWS credentials set to environment variables or have setup AWS credentials using the AWS CLI.  Please refer to the official AWS documentation [here](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) to see all the ways to set these credentials. 

Basically, these values need to be set:
```
export AWS_ACCESS_KEY_ID=value
export AWS_SECRET_ACCESS_KEY=value
export AWS_SESSION_TOKEN=value
```

You can get these from the main screen after logging in. 

### Running and Testing

You first build the code by running `yarn build`.  This will produce the bundle file in the `dist` directory.

TODO: `yarn test`

To run locally, use `SLS_DEBUG=* yarn sls offline --verbose`. You can then hit the endpoints displayed in the console using curl, postman or any HTTP client.

### Deploying

To deploy, make sure you have AWS credentials set in your local environment.

To deploy to development environment:
`yarn sls deploy --stage dev`

To deploy to production environment:
`yarn sls deploy --stage prd`

### Running MongoDB

The first step to run MongoDB is making sure the service is installed on the machine locally. You can check the [official MongoDB website](https://www.mongodb.com/docs/manual/installation/#mongodb-installation-tutorials) for more information on the installation process.

To process database transactions such as `create` calls, Prisma needs the MongoDB instance to be running as a replica set. Run the commands below to start a replica set with `mongod` and `mongosh`:

```
// You should replace the dbpath with the actual path on your machine and assign a name to your replica set. (Default path on linux is: /var/lib/mongodb)
// Do not close the terminal tab after running mongod.
$ sudo mongod --port 27017 --dbpath /path/to/db --replSet replicaName --bind_ip localhost,127.0.0.1
// Start a mongosh session and run the replica set initiation command in the mongo shell.
$ mongosh
    > rs.initiate()
```

Make sure you copy the connection string that is presented in the `Connecting to` field when the mongosh service starts to run. We need the connection string to access the replica set. Rename the `.env.example` file to `.env` and replace the connection string placeholder in the file with the one you copied.

### Prisma configuration

In order to use and integrate Prisma, both of the `prisma` and `@prisma/client` packages are needed. The `prisma` package reads the schema and generates a version of Prisma Client that is tailored to our modules.

Run the following commands to install the packages and generate the customized Prisma Client version based on the schema:

```
yarn add prisma @prisma/client
yarn prisma:generate
```