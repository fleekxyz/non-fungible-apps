#!/bin/bash

bold=$(tput bold)
normal=$(tput sgr0)

source .env

echo "${bold}Starting the deployment process"

echo "${bold}Installing dependencies via Yarn"

yarn

if [[ -z "${DATABASE_URL}" ]]; then
  printf "%s" "Enter the Mongo Database URL: "
  read -r DB_URL
  export DATABASE_URL=$DB_URL
fi

if [[ -z "${JSON_RPC}" ]]; then
  printf "%s" "Enter the JSON RPC endpoint: "
  read -r JSON_RPC
  export JSON_RPC=$JSON_RPC
fi

if [[ -z "${CONTRACT_ADDRESS}" ]]; then
  printf "%s" "Enter the contract address: "
  read -r CONTRACT_ADDRESS
  export CONTRACT_ADDRESS=$CONTRACT_ADDRESS
fi

if [[ -z "${PRIVATE_KEY}" ]]; then
  printf "%s" "Enter the private key: "
  read -r PRIVATE_KEY
  export PRIVATE_KEY=$PRIVATE_KEY
fi

if [[ -z "${AWS_ACCESS_KEY_ID}" ]]; then
  printf "%s" "Enter the AWS access key ID: "
  read -r AWS_ACCESS_KEY_ID
  export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
fi

if [[ -z "${AWS_SECRET_ACCESS_KEY}" ]]; then
  printf "%s" "Enter the AWS secret access key: "
  read -r AWS_SECRET_ACCESS_KEY
  export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
fi

echo "${bold}Copying the Prisma schema file to function directories"
cp prisma/schema.prisma dist/serverless/src/functions/builds/
cp prisma/schema.prisma dist/serverless/src/functions/mints/

echo "${bold}Running the build command"
yarn build

echo "${bold}Copying the .env file to dist/"
cp .env src/

echo "${bold}Copying the Prisma schema file to function directories"
cp prisma/schema.prisma dist/serverless/src/functions/builds/
cp prisma/schema.prisma dist/serverless/src/functions/mints/

echo "${bold}Generating Prisma Client"
yarn prisma:generate

echo "${bold}Creating layer zip files"
/bin/bash ./scripts/prepare-libs-lambda-layer.sh
/bin/bash ./scripts/prepare-prisma-client-lambda-layer.sh 
/bin/bash ./scripts/prepare-node-modules-lambda-layer.sh

echo "${bold}Removing the copied Prisma schema files"
rm dist/serverless/src/functions/builds/schema.prisma
rm dist/serverless/src/functions/mints/schema.prisma

echo "${bold}Deploying to AWS lambda"
yarn sls deploy --stage dev --verbose

# step 0 -> run yarn
# step 1 -> take params (env variables)
# step 2 -> build tsc files with yarn build
# step 3 -> run yarn generate:prisma
# step 4 -> run the other shell scripts for layer generation
# step 5 -> run the deployment command to aws

# TODO the .env file needs to move to the inside of the serverless dir in dist (zip file)
# TODO Prisma.schema files aren't being packaged with the functions in the nfa-serverless.zip file in .serverless.