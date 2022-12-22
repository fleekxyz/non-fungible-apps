const contractName = 'FleekERC721';

const args = [
  'FleekNFAs', // Collection name
  'FLKNFA', // Collection symbol
];

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const namedAccounts = await getNamedAccounts();
  const { privateKey } = namedAccounts;

  if (!privateKey) {
    log('Please set "PRIVATE_KEY" environment variable to deploy to Mumbai');
    throw new Error('Missing private key');
  }

  const deployResult = await deploy(contractName, {
    from: privateKey,
    args,
  });

  if (deployResult.newlyDeployed) {
    log(
      `Contract ${contractName} deployed at ${deployResult.address} using ${deployResult.receipt.gasUsed} gas`
    );
  } else {
    log(
      `Using pre-existing contract ${contractName} at ${deployResult.address}`
    );
  }
};
//You can put an array of tags below. Tags can be anything and say when a this script should be run. So you can write different scripts for local, prod or other deploys
//For example when you run 'npx hardhat --network hardhat deploy --tags local' hardhat will run all deploy scripts that have the tag local, could be multiple dif scripts
module.exports.tags = ['mumbai'];
