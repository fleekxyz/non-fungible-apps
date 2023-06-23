#!/bin/bash

bold=$(tput bold)
normal=$(tput sgr0)

source .env

echo "${bold}Starting the deployment process${normal}"

# Default value for the stage variable
stage="dev"

# Parse command line options using getopts
while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
        --stage)
            shift
            stage="$1"
            ;;
        *)
            # Ignore unknown options or arguments
            ;;
    esac

    shift
done

# Check if the stage variable has a non-empty value
if [ -n "$stage" ]; then
    echo "Passed stage value: $stage"
else
    echo "Stage flag not provided or value not specified."
    echo "Will proceed with the default value: dev"
fi

echo "${bold}Installing dependencies via Yarn${normal}"

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

echo "${bold}Copying the Prisma schema file to function directories${normal}"
cp prisma/schema.prisma dist/src/functions/builds/
cp prisma/schema.prisma dist/src/functions/mints/

echo "${bold}Generating Prisma Client${normal}"
yarn prisma:generate

echo "${bold}Running the build command${normal}"
yarn build

echo "${bold}Copying the rhel openssl engine to dist/${normal}"
cp node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node dist/src/functions/mints
cp node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node dist/src/functions/builds
cp node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node dist/src/functions/apps

echo "${bold}Copying the .env file to dist/${normal}"
cp .env src/

echo "${bold}Copying the FleekERC721.json file to dist/serverless/src/libs${normal}"
cp src/libs/FleekERC721.json dist/src/libs/

echo "${bold}Copying the Prisma schema file to function directories${normal}"
cp prisma/schema.prisma dist/src/functions/builds/
cp prisma/schema.prisma dist/src/functions/mints/
cp prisma/schema.prisma dist/src/functions/apps/

echo "${bold}Creating layer zip files${normal}"
/bin/bash ./scripts/prepare-libs-lambda-layer.sh
/bin/bash ./scripts/prepare-prisma-client-lambda-layer.sh 
/bin/bash ./scripts/prepare-node-modules-lambda-layer.sh

echo "${bold}Deploying to AWS lambda${normal}"
yarn sls deploy --stage "$stage" --verbose

# step 0 -> run yarn
# step 1 -> take params (env variables)
# step 2 -> build tsc files with yarn build
# step 3 -> run yarn generate:prisma
# step 4 -> run the other shell scripts for layer generation
# step 5 -> run the deployment command to aws

# TODO the .env file needs to move to the inside of the serverless dir in dist (zip file)
# TODO Prisma.schema files aren't being packaged with the functions in the nfa-serverless.zip file in .serverless.