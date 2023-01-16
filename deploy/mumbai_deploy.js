const { proxyStore, getProxyAddress } = require('./proxy-store');

const contractName = 'FleekERC721';

const args = [
  'Test NFT Apps', // Collection name
  'TNA', // Collection symbol
];

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const namedAccounts = await getNamedAccounts();
  const { privateKey } = namedAccounts;

  if (!privateKey) {
    log('Please set "PRIVATE_KEY" environment variable to deploy to Mumbai');
    throw new Error('Missing private key');
  }

  const Contract = await ethers.getContractFactory(contractName);

  const proxyAddress = await getProxyAddress(contractName, hre.network.name);

  try {
    if (!proxyAddress) throw new Error('No proxy address found');
    const deployResult = await upgrades.upgradeProxy(proxyAddress, Contract);
    log(`Upgrading contract  ${contractName} at ${deployResult.address}`);
  } catch (e) {
    if (
      e.message === 'No proxy address found' ||
      e.message.includes("doesn't look like an ERC 1967 proxy")
    ) {
      const deployResult = await upgrades.deployProxy(Contract, args);
      await deployResult.deployed();
      await proxyStore(contractName, deployResult.address, hre.network.name);
      log(
        `Contract ${contractName} deployed at ${deployResult.address} by account ${privateKey}`
      );
    } else {
      throw e;
    }
  }
};

//You can put an array of tags below. Tags can be anything and say when a this script should be run. So you can write different scripts for local, prod or other deploys
//For example when you run 'npx hardhat --network hardhat deploy --tags local' hardhat will run all deploy scripts that have the tag local, could be multiple dif scripts
module.exports.tags = ['mumbai'];
