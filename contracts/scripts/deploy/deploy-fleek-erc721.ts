import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployLibraries } from './deploy-libraries';
import { deployContractWithProxy } from './deploy-proxy-contract';
import { Contract } from 'ethers';

type TaskArgs = {
  newProxyInstance: boolean;
  name: string;
  symbol: string;
  billing: number[];
};

export default async (
  { newProxyInstance, name, symbol, billing }: TaskArgs,
  hre: HardhatRuntimeEnvironment
): Promise<Contract> => {
  console.log('Deploying FleekERC721...');
  const libraries = await deployLibraries(['FleekSVG'], hre);

  return deployContractWithProxy(
    {
      name: 'FleekERC721',
      newProxyInstance,
      args: [name, symbol, billing],
      libraries,
    },
    hre
  );
};
