import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployLibraries } from './deploy-libraries';
import { deployContractWithProxy } from './deploy-proxy-contract';

type TaskArgs = {
  newProxyInstance: boolean;
  name: string;
  symbol: string;
  billing: number[];
};

export default async (
  { newProxyInstance, name, symbol, billing }: TaskArgs,
  hre: HardhatRuntimeEnvironment
): Promise<void> => {
  console.log('Deploying FleekERC721...');
  const libraries = await deployLibraries(['FleekSVG'], hre);

  await deployContractWithProxy(
    {
      name: 'FleekERC721',
      newProxyInstance,
      args: [name, symbol, billing],
      libraries,
    },
    hre
  );
};
