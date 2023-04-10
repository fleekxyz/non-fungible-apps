import { JsonRpcProvider, Networkish } from '@ethersproject/providers';
import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';

import { env } from '@/constants';

import * as Contracts from './contracts';

const config = {
  apiKey: env.alchemy.id,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

export const Ethereum: Ethereum.Core = {
  //TODO remove
  defaultNetwork: 'https://rpc-mumbai.maticvigil.com', // TODO: make it environment variable

  provider: {
    metamask:
      window.ethereum && new ethers.providers.Web3Provider(window.ethereum),
  },

  getContract(contractName, providerName) {
    const contract = Contracts[contractName];

    const provider =
      providerName && providerName in this.provider
        ? this.provider[providerName].getSigner()
        : ethers.getDefaultProvider(this.defaultNetwork);

    return new ethers.Contract(contract.address, contract.abi, provider);
  },

  //TODO remove cause we're using ENS subgraph
  async getEnsName(address) {
    const ensAddresses = await alchemy.nft.getNftsForOwner(address, {
      contractAddresses: [env.ens.contractAddress],
    });

    return ensAddresses.ownedNfts.map((nft) => nft.title);
  },

  //TODO remove if we're not gonna validate ens on the client side
  async validateEnsName(name) {
    const provider = new ethers.providers.JsonRpcProvider(
      env.ens.validationEnsURL
    );

    return Boolean(await provider.resolveName(name));
  },
};

export namespace Ethereum {
  export type Providers = 'metamask';

  export type Core = {
    defaultNetwork: Networkish;

    provider: {
      [key in Providers]: JsonRpcProvider;
    };

    getContract: (
      contractName: keyof typeof Contracts,
      providerName?: Providers
    ) => ethers.Contract;

    getEnsName: (address: string) => Promise<string[]>;

    validateEnsName: (name: string) => Promise<boolean>;
  };
}
