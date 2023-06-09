#!/bin/bash
function prepare_node_modules_lambda_layer() {
  echo "Cleaning up workspace ..."
  rm -rf lambda-layers-node_modules

  echo "Creating layer ..."
  mkdir -p lambda-layers-node_modules/nodejs

  echo "Prepare server node_modules lambda layer ..."
  cp -r node_modules lambda-layers-node_modules/nodejs

  echo "Remove Prisma..."
  rm -rf lambda-layers-node_modules/nodejs/node_modules/@prisma
  rm -rf lambda-layers-node_modules/nodejs/node_modules/.prisma

  echo "Compressing ..."
  pushd lambda-layers-node_modules && tar -zcf /tmp/nodejs.tar.gz . && mv /tmp/nodejs.tar.gz ./nodejs.tar.gz

  echo "Remove unzipped files ..."
  rm -rf nodejs

  echo "Stats:"
  ls -lh nodejs.tar.gz

  popd
}
prepare_node_modules_lambda_layer