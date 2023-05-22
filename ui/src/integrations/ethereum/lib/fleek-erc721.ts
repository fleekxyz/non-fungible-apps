import {
  ErrorDescription as InterfaceErrorDescription,
  Result as InterfaceResult,
} from '@ethersproject/abi/lib/interface';
import { BytesLike } from 'ethers';

import { Ethereum } from '../ethereum';

enum Billing {
  Mint,
  AddAccessPoint,
}

enum CollectionRoles {
  Owner,
  Verifier,
}

enum TokenRoles {
  Controller,
}

export const FleekERC721 = {
  contract: Ethereum.getContract('FleekERC721'),

  Enums: {
    Billing,
    CollectionRoles,
    TokenRoles,
  },

  async mint(
    params: FleekERC721.MintParams,
    provider: Ethereum.Providers
  ): Promise<void> {
    const response = await this.contract.connect(provider).mint(
      params.owner,
      params.name,
      params.description.replaceAll(/\n/g, '\\n'), //replace break lines with \\n so it doesn't break the json,
      params.image,
      params.externalUrl,
      params.ipfsHash,
      params.ens,
      params.commitHash,
      params.repo
    );

    return response;
  },

  async tokenMetadata(tokenId: number): Promise<FleekERC721.Metadata> {
    const response = await this.contract.tokenURI(Number(tokenId));

    const parsed = JSON.parse(
      Buffer.from(response.slice(29), 'base64')
        .toString('utf-8')
        .replaceAll(/\n/g, '\\n') // replace escaped newlines
    );

    return parsed;
  },

  async lastTokenId(): Promise<number> {
    const contract = Ethereum.getContract('FleekERC721');

    return contract.getLastTokenId();
  },

  async getBilling(key: keyof typeof Billing): Promise<string> {
    const contract = Ethereum.getContract('FleekERC721');

    return (await contract.getBilling(this.Enums.Billing[key])).toString();
  },

  parseError(error: BytesLike): FleekERC721.TransactionError {
    try {
      if (!error) throw new Error('Empty error');

      const description = this.contract.interface.parseError(error);
      const result = this.contract.interface.decodeErrorResult(
        description.signature,
        error
      );

      let message: string;

      switch (description.signature) {
        case 'ContractIsNotPausable()':
          message = 'This contract is not pausable';
          break;

        case 'ContractIsNotPaused()':
          message = 'This contract is not paused';
          break;

        case 'ContractIsPaused()':
          message = 'This contract is paused';
          break;

        case 'MustBeTokenOwner(uint256)':
          message = `You must be the token #${result.tokenId} owner`;
          break;

        case 'MustHaveAtLeastOneOwner()':
          message = 'You must have at least one owner';
          break;

        case 'MustHaveCollectionRole(uint8)':
          message = `You must have a collection role "${
            CollectionRoles[result.role]
          }" to mint`;
          break;

        case 'MustHaveTokenRole(uint256,uint8)':
          message = `You must have a token role "${
            TokenRoles[result.role]
          }" on token #${result.tokenId}`;
          break;

        case 'PausableIsSetTo(bool)':
          message = `Pausable is set to "${result.isPausable}"`;
          break;

        case 'RoleAlreadySet()':
          message = `Role is already set`;
          break;

        case 'ThereIsNoTokenMinted()':
          message = `There is no token minted`;
          break;

        default:
          message = 'Unknown error';
      }

      return {
        message,
        description,
        result,
        isIdentified: true,
      };
    } catch {
      return {
        message: 'Unknown error',
        description: null,
        result: null,
        isIdentified: false,
      };
    }
  },
};

export namespace FleekERC721 {
  export type MintParams = {
    name: string;
    description: string;
    owner: string;
    externalUrl: string;
    ipfsHash: string;
    image: string;
    ens?: string;
    commitHash: string;
    repo: string;
  };

  export type Metadata = Omit<MintParams, 'ens' | 'commitHash' | 'repo'> & {
    attributes: [
      {
        trait_type: string;
        value: string;
      }
    ];
  };

  export type TransactionError = {
    message: string;
    description: InterfaceErrorDescription | null;
    result: InterfaceResult | null;
    isIdentified: boolean;
  };
}
