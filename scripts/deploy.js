const { getProxyAddress, proxyStore } = require('./utils/proxy-store');

const CONTRACT_NAME = 'FleekERC721';
const NETWORK = hre.network.name;
const ARGUMENTS = [
  'FleekNFAs', // Collection name
  'FLKNFA', // Collection symbol
];

const deploy = async () => {
  const Contract = await ethers.getContractFactory(CONTRACT_NAME);
  const proxyAddress = await getProxyAddress(CONTRACT_NAME, NETWORK);

  try {
    if (!proxyAddress) throw new Error('No proxy address found');
    console.log(`Trying to upgrade proxy contract at: "${proxyAddress}"`);
    const deployResult = await upgrades.upgradeProxy(proxyAddress, Contract);
    console.log(
      `Contract ${CONTRACT_NAME} upgraded at "${deployResult.address}" by account "${deployResult.signer.address}"`
    );
  } catch (e) {
    if (
      e.message === 'No proxy address found' ||
      e.message.includes("doesn't look like an ERC 1967 proxy")
    ) {
      console.log(`Failed to upgrade proxy contract: "${e.message?.trim()}"`);
      console.log('Creating new proxy contract...');
      const deployResult = await upgrades.deployProxy(Contract, ARGUMENTS);
      await deployResult.deployed();
      await proxyStore(CONTRACT_NAME, deployResult.address, hre.network.name);
      console.log(
        `Contract ${CONTRACT_NAME} deployed at "${deployResult.address}" by account "${deployResult.signer.address}"`
      );
    } else {
      throw e;
    }
  }
};

console.log(':: Starting Deployment ::');
console.log('Network:', NETWORK);
console.log('Contract:', CONTRACT_NAME);
deploy();
