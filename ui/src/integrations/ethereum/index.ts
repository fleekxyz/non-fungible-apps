import { JsonRpcProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';

export type EthereumProviders = 'metamask';

type EthereumObject = {
  provider: { [key in EthereumProviders]: JsonRpcProvider };
};

export const Ethereum: EthereumObject = {
  provider: {
    metamask:
      window.ethereum &&
      new ethers.providers.Web3Provider(window.ethereum as any),
  },
};
