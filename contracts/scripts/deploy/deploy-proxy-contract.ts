import { getProxyAddress, proxyStore } from '../utils/proxy-store';
import { deployStore } from '../utils/deploy-store';
import { UpgradeProxyOptions } from '@openzeppelin/hardhat-upgrades/dist/utils';
import { Contract } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const DEFAULT_PROXY_SETTINGS: UpgradeProxyOptions = {
  unsafeAllow: ['external-library-linking'],
};

type DeployContractArgs = {
  name: string;
  newProxyInstance: boolean;
  args: unknown[];
  libraries?: Record<string, string>;
};

export const deployContractWithProxy = async (
  { name, newProxyInstance, args, libraries }: DeployContractArgs,
  hre: HardhatRuntimeEnvironment
): Promise<Contract> => {
  // const { newProxyInstance, name, symbol, billing } = taskArgs;
  const network = hre.network.name;

  console.log(`Deploying: ${name}`);
  console.log('Arguments:', args);
  console.log();

  const Contract = await hre.ethers.getContractFactory(name, {
    libraries,
  });
  const proxyAddress = await getProxyAddress(name, network);

  let deployResult;

  try {
    if (!proxyAddress || newProxyInstance)
      throw new Error('new-proxy-instance');
    console.log(`Trying to upgrade proxy contract at: "${proxyAddress}"`);
    deployResult = await hre.upgrades.upgradeProxy(
      proxyAddress,
      Contract,
      DEFAULT_PROXY_SETTINGS
    );

    console.log('\x1b[32m');
    console.log(
      `Contract ${name} upgraded at "${
        deployResult.address
      }" by account "${await deployResult.signer.getAddress()}"`
    );
    console.log('\x1b[0m');
  } catch (e) {
    if (
      e instanceof Error &&
      (e.message === 'new-proxy-instance' ||
        e.message.includes("doesn't look like an ERC 1967 proxy"))
    ) {
      console.log(`Failed to upgrade proxy contract: "${e.message?.trim()}"`);
      console.log('Creating new proxy contract...');
      deployResult = await hre.upgrades.deployProxy(
        Contract,
        args,
        DEFAULT_PROXY_SETTINGS
      );
      await deployResult.deployed();
      await proxyStore(name, deployResult.address, network);

      console.log('\x1b[32m');
      console.log(
        `Contract ${name} deployed at "${
          deployResult.address
        }" by account "${await deployResult.signer.getAddress()}"`
      );
      console.log('\x1b[0m');
    } else {
      throw e;
    }

    try {
      await deployStore(network, name, deployResult);
    } catch (e) {
      console.error('Could not write deploy files', e);
    }
  }

  return deployResult;
};
