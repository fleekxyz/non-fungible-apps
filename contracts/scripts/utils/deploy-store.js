const { getImplementationAddress } = require('@openzeppelin/upgrades-core');
const { writeFile } = require('./file');
const { existsSync } = require('fs');
const path = require('path');

const getDeployFilePath = (network, contractName) => {
  return path.resolve(
    __dirname,
    `../../deployments/${network}/${contractName}.json`
  );
};

const getBuildData = async (contractName) => {
  const buildArtifact = await hre.artifacts.readArtifact(contractName);
  const {
    id: buildId,
    input: solcInput,
    output: solcOutput,
  } = await hre.artifacts.getBuildInfo(
    `${buildArtifact.sourceName}:${buildArtifact.contractName}`
  );

  const contractOutput =
    solcOutput.contracts[buildArtifact.sourceName][contractName];

  return {
    buildId,
    abi: contractOutput.abi,
    bytecode: buildArtifact.bytecode,
    metadata: contractOutput.metadata,
    storageLayout: contractOutput.storageLayout,
    solcInput,
  };
};

const deployStore = async (network, contractName, contract, isProxy = true) => {
  const filePath = getDeployFilePath(network, contractName);

  const { buildId, solcInput, abi, bytecode, metadata, storageLayout } =
    await getBuildData(contractName);

  const data = {
    buildId,
    timestamp: new Date().toLocaleString('en-US'),
    address: contract.address,
    transactionHash: contract.deployTransaction.hash,
    args: contract.deployTransaction.args,
    gasPrice: contract.deployTransaction.gasPrice.toNumber(),
    abi,
    bytecode,
    metadata,
    storageLayout,
  };

  if (isProxy) {
    const implementationAddress = await getImplementationAddress(
      hre.network.provider,
      contract.address
    );
    data.implementationAddress = implementationAddress;
  }

  try {
    const solcInputsFilePath =
      filePath.split('/').slice(0, -1).join('/') +
      `/solcInputs/${buildId}.json`;
    console.log('Writing deploy files', filePath);

    await writeFile(filePath, JSON.stringify(data, null, 2));
    await writeFile(solcInputsFilePath, JSON.stringify(solcInput, null, 2));
  } catch (err) {
    throw `Could not write file: ${err}`;
  }
};

const getCurrentAddressIfSameBytecode = async (contractName) => {
  const { bytecode } = await getBuildData(contractName);

  if (existsSync(getDeployFilePath(hre.network.name, contractName))) {
    const deployData = require(getDeployFilePath(
      hre.network.name,
      contractName
    ));
    return deployData.bytecode === bytecode ? deployData.address : null;
  }

  return null;
};

module.exports = {
  getBuildData,
  deployStore,
  getCurrentAddressIfSameBytecode,
};
