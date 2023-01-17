const { writeFile } = require('./file');
const path = require('path');

const getDeployFilePath = (network, contractName) => {
  return path.resolve(
    __dirname,
    `../../deployments/${network}/${contractName}.json`
  );
};

module.exports.deployStore = async (network, contractName, contract) => {
  const filePath = getDeployFilePath(network, contractName);

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

  const data = {
    timestamp: new Date().toLocaleString('en-US'),
    address: contract.address,
    transactionHash: contract.deployTransaction.hash,
    args: contract.deployTransaction.args,
    gasPrice: contract.deployTransaction.gasPrice.toNumber(),
    abi: contractOutput.abi,
    bytecode: buildArtifact.bytecode,
    metadata: contractOutput.metadata,
    storageLayout: contractOutput.storageLayout,
  };

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
