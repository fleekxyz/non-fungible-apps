import { JsonRpcProvider, Networkish } from '@ethersproject/providers';
import { ethers } from 'ethers';
import * as Contracts from './contracts';
import { env } from '@/constants';
import { Alchemy, Network } from 'alchemy-sdk';

const config = {
  apiKey: env.alchemy.id,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

export const Ethereum: Ethereum.Core = {
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

  getEnsName(address) {
    return alchemy.nft
      .getNftsForOwner(address, {
        contractAddresses: [env.ensContractAddress],
      })
      .then((ensList) => {
        return ensList.ownedNfts.map((nft) => nft.title);
      });
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
  };
}
