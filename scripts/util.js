module.exports.getContract = async function (contractName) {
  const {
    address,
  } = require(`../deployments/${hre.network.name}/${contractName}.json`);

  return hre.ethers.getContractAt(contractName, address);
};
