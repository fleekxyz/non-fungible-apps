module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const namedAccounts = await getNamedAccounts();
  const { privatekey } = namedAccounts;

  const deployResult = await deploy('FleekERC721', {
    from: privatekey,
    args: ['FleekSites', 'FLKSITE'],
  });
  if (deployResult.newlyDeployed) {
    log(
      `contract FleekSites deployed at ${deployResult.address} using ${deployResult.receipt.gasUsed} gas`
    );
  } else {
    log(`using pre-existing contract FleekSites at ${deployResult.address}`);
  }
};
//You can put an array of tags below. Tags can be anything and say when a this script should be run. So you can write different scripts for local, prod or other deploys
//For example when you run 'npx hardhat --network hardhat deploy --tags local' hardhat will run all deploy scripts that have the tag local, could be multiple dif scripts
module.exports.tags = ['mumbai'];
