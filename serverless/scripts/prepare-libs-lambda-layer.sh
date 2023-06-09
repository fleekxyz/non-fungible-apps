#!/bin/bash
function prepare_libs_lambda_layer() {
  echo "Cleaning up ..."
  rm -rf lambda-layers-libs

  echo "Creating layer ..."
  mkdir -p lambda-layers-libs/nodejs/node_modules/@libs

  echo "Prepare libs lambda layer ..."
  cp -r dist/serverless/src/libs/* lambda-layers-libs/nodejs/node_modules/@libs/

  echo "Compressing ..."
  pushd lambda-layers-libs && tar -zcf /tmp/nodejs.tar.gz . && mv /tmp/nodejs.tar.gz ./nodejs.tar.gz

  echo "Remove unzipped files ..."
  rm -rf nodejs

  echo "Stats:"
  ls -lh nodejs.tar.gz

  popd
}
prepare_libs_lambda_layer