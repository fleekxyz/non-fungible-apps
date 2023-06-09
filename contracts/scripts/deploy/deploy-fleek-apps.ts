import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployLibraries } from './deploy-libraries';
import { deployContractWithProxy } from './deploy-proxy-contract';
import { getContract } from '../util';
import { Contract } from 'ethers';

type TaskArgs = {
  newProxyInstance: boolean;
  name: string;
  symbol: string;
};

export default async (
  { newProxyInstance, name, symbol }: TaskArgs,
  hre: HardhatRuntimeEnvironment
): Promise<Contract> => {
  console.log('Deploying FleekApps...');
  const libraries = await deployLibraries(['FleekSVG'], hre);

  const mainContract = await getContract('FleekERC721');

  return deployContractWithProxy(
    {
      name: 'FleekApps',
      newProxyInstance,
      args: [name, symbol, mainContract.address],
      libraries,
    },
    hre
  );
};
