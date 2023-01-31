module.exports.getContract = async function (contractName) {
  const proxyDeployments =
    require(`../deployments/${hre.network.name}/proxy.json`)[contractName];

  if (!proxyDeployments || !proxyDeployments.length) {
    throw new Error(
      `No proxy deployments found for "${contractName}" under "${hre.network.name}"`
    );
  }

  const latestDeployment = proxyDeployments[0];

  return hre.ethers.getContractAt(contractName, latestDeployment.address);
};
