module.exports.getContract = async function (contractName) {
  const deployment = require(`../deployments/${hre.network.name}/${contractName}.json`);

  if (!deployment) {
    throw new Error(
      `No deployment found for "${contractName}" under "${hre.network.name}"`
    );
  }

  console.log(`Using latest deployment for "${deployment.address}":`);

  return hre.ethers.getContractAt(contractName, deployment.address);
};

module.exports.parseDataURI = function (dataURI) {
  if (!dataURI.startsWith('data:')) throw new Error('Invalid data URI');
  dataURI.replace('data:', '');
  const [type, data] = dataURI.split(';base64,');

  switch (type) {
    case 'application/json':
      return JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
    default:
      throw new Error(`Unsupported data URI type: ${type}`);
  }
};
