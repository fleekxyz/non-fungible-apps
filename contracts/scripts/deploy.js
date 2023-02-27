const {
  deployStore,
  getCurrentAddressIfSameBytecode,
} = require('./utils/deploy-store');
const { getProxyAddress, proxyStore } = require('./utils/proxy-store');

// --- Inputs ---
const ARGUMENTS = [
  'FleekNFAs', // Collection name
  'FLKNFA', // Collection symbol
];

// --- Script Settings ---
const CONTRACT_NAME = 'FleekERC721';
const NETWORK = hre.network.name;
const DEFAULT_PROXY_SETTINGS = {
  unsafeAllow: ['external-library-linking'],
};
const LIBRARIES_TO_DEPLOY = ['FleekSVG'];

const libraryDeployment = async () => {
  console.log('Deploying Libraries...');
  const libraries = {};

  for (const lib of LIBRARIES_TO_DEPLOY) {
    const libAddress = await getCurrentAddressIfSameBytecode(lib);
    if (libAddress) {
      console.log(`Library "${lib}" already deployed at ${libAddress}`);
      libraries[lib] = libAddress;
      continue;
    }
    const libContract = await hre.ethers.getContractFactory(lib);
    const libInstance = await libContract.deploy();
    await libInstance.deployed();
    deployStore(NETWORK, lib, libInstance);
    console.log(`Library "${lib}" deployed at ${libInstance.address}`);
    libraries[lib] = libInstance.address;
  }

  return libraries;
};

const main = async () => {
  console.log(':: Starting Deployment ::');
  console.log('Network:', NETWORK);
  console.log('Contract:', CONTRACT_NAME);

  const libraries = await libraryDeployment();

  const Contract = await ethers.getContractFactory(CONTRACT_NAME, {
    libraries,
  });
  const proxyAddress = await getProxyAddress(CONTRACT_NAME, NETWORK);

  let deployResult;

  try {
    if (!proxyAddress) throw new Error('No proxy address found');
    console.log(`Trying to upgrade proxy contract at: "${proxyAddress}"`);
    deployResult = await upgrades.upgradeProxy(
      proxyAddress,
      Contract,
      DEFAULT_PROXY_SETTINGS
    );
    console.log(
      `Contract ${CONTRACT_NAME} upgraded at "${deployResult.address}" by account "${deployResult.signer.address}"`
    );
    await deployStore(NETWORK, CONTRACT_NAME, deployResult);
  } catch (e) {
    if (
      e.message === 'No proxy address found' ||
      e.message.includes("doesn't look like an ERC 1967 proxy")
    ) {
      console.log(`Failed to upgrade proxy contract: "${e.message?.trim()}"`);
      console.log('Creating new proxy contract...');
      deployResult = await upgrades.deployProxy(
        Contract,
        ARGUMENTS,
        DEFAULT_PROXY_SETTINGS
      );
      await deployResult.deployed();
      await proxyStore(CONTRACT_NAME, deployResult.address, hre.network.name);
      console.log(
        `Contract ${CONTRACT_NAME} deployed at "${deployResult.address}" by account "${deployResult.signer.address}"`
      );
    } else {
      throw e;
    }

    try {
      await deployStore(NETWORK, CONTRACT_NAME, deployResult);
    } catch (e) {
      console.error('Could not write deploy files', e);
    }
  }

  return deployResult;
};

main();
