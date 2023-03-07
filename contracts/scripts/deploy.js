const {
  deployStore,
  getCurrentAddressIfSameBytecode,
} = require('./utils/deploy-store');
const { getProxyAddress, proxyStore } = require('./utils/proxy-store');

// --- Script Settings ---
const CONTRACT_NAME = 'FleekERC721';
const DEFAULT_PROXY_SETTINGS = {
  unsafeAllow: ['external-library-linking'],
};
const LIBRARIES_TO_DEPLOY = ['FleekSVG'];

const libraryDeployment = async (hre) => {
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
    deployStore(hre.network.name, lib, libInstance);
    console.log(`Library "${lib}" deployed at ${libInstance.address}`);
    libraries[lib] = libInstance.address;
  }

  return libraries;
};

module.exports = async (taskArgs, hre) => {
  const { newProxyInstance, name, symbol, billing } = taskArgs;
  const network = hre.network.name;

  console.log(':: Starting Deployment ::');
  console.log('Network:', network);
  console.log('Contract:', CONTRACT_NAME);
  console.log(':: Arguments ::');
  console.log(taskArgs);
  console.log();

  const arguments = [name, symbol, billing];

  const libraries = await libraryDeployment(hre);

  const Contract = await ethers.getContractFactory(CONTRACT_NAME, {
    libraries,
  });
  const proxyAddress = await getProxyAddress(CONTRACT_NAME, network);

  let deployResult;

  try {
    if (!proxyAddress || newProxyInstance)
      throw new Error('new-proxy-instance');
    console.log(`Trying to upgrade proxy contract at: "${proxyAddress}"`);
    deployResult = await upgrades.upgradeProxy(
      proxyAddress,
      Contract,
      DEFAULT_PROXY_SETTINGS
    );

    console.log('\x1b[32m');
    console.log(
      `Contract ${CONTRACT_NAME} upgraded at "${deployResult.address}" by account "${deployResult.signer.address}"`
    );
    console.log('\x1b[0m');
    await deployStore(network, CONTRACT_NAME, deployResult);
  } catch (e) {
    if (
      e.message === 'new-proxy-instance' ||
      e.message.includes("doesn't look like an ERC 1967 proxy")
    ) {
      console.log(`Failed to upgrade proxy contract: "${e.message?.trim()}"`);
      console.log('Creating new proxy contract...');
      deployResult = await upgrades.deployProxy(
        Contract,
        arguments,
        DEFAULT_PROXY_SETTINGS
      );
      await deployResult.deployed();
      await proxyStore(CONTRACT_NAME, deployResult.address, network);

      console.log('\x1b[32m');
      console.log(
        `Contract ${CONTRACT_NAME} deployed at "${deployResult.address}" by account "${deployResult.signer.address}"`
      );
      console.log('\x1b[0m');
    } else {
      throw e;
    }

    try {
      await deployStore(network, CONTRACT_NAME, deployResult);
    } catch (e) {
      console.error('Could not write deploy files', e);
    }
  }

  return deployResult;
};
