## NFA - Serverless

### Requirements

This sub-project of NFAs requires Node 18.  Specifically, this has been tested with 18.13.0 so far.

### Setup

After cloning the repo, ensure you run `yarn` in the root directory. After that, `cd` into the `serverless` directory and alsy run `yarn`.

If you are deploying, make sure you have your AWS credentials set to environment variables or have setup AWS credentials using the AWS CLI.

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