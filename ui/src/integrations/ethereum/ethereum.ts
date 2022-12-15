import { JsonRpcProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import * as Contracts from './contracts';

export type EthereumProviders = 'metamask';

type EthereumObject = {
  provider: { [key in EthereumProviders]: JsonRpcProvider };
  getContract: (
    contractName: keyof typeof Contracts,
    providerName: EthereumProviders
  ) => Promise<ethers.Contract>;
};

export const Ethereum: EthereumObject = {
  provider: {
    metamask:
      window.ethereum &&
      new ethers.providers.Web3Provider(window.ethereum as any),
  },

  async getContract(contractName, providerName) {
    const contract = Contracts[contractName];
    return new ethers.Contract(
      contract.address,
      contract.abi,
      this.provider[providerName].getSigner()
    );
  },
};
