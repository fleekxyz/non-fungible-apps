import {
  deployStore,
  getCurrentAddressIfSameBytecode,
} from '../utils/deploy-store';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

export const deployLibraries = async (
  librariesToDeploy: string[],
  hre: HardhatRuntimeEnvironment
) => {
  console.log('Deploying Libraries...');
  const libraries: Record<string, string> = {};

  for (const lib of librariesToDeploy) {
    const libAddress: string = await getCurrentAddressIfSameBytecode(lib);
    if (libAddress) {
      console.log(`Library "${lib}" already deployed at ${libAddress}`);
      libraries[lib] = libAddress;
      continue;
    }
    const libContract = await hre.ethers.getContractFactory(lib);
    const libInstance = await libContract.deploy();
    await libInstance.deployed();
    await deployStore(hre.network.name, lib, libInstance, false);
    console.log(`Library "${lib}" deployed at ${libInstance.address}`);
    libraries[lib] = libInstance.address;
  }

  return libraries;
};
