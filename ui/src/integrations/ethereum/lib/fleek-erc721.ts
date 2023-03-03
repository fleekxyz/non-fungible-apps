import { Ethereum } from '../ethereum';

enum Billing {
  Mint,
  AddAccessPoint,
}

export const FleekERC721 = {
  Enums: {
    Billing,
  },

  async mint(
    params: FleekERC721.MintParams,
    provider: Ethereum.Providers
  ): Promise<void> {
    const contract = Ethereum.getContract('FleekERC721', provider);

    const response = await contract.mint(
      params.owner,
      params.name,
      params.description.replaceAll(/\n/g, '\\n'), //replace break lines with \\n so it doesn't break the json,
      params.image,
      params.externalUrl,
      params.ens,
      params.commitHash,
      params.repo
    );

    return response;
  },

  async tokenMetadata(tokenId: number): Promise<FleekERC721.Metadata> {
    const contract = Ethereum.getContract('FleekERC721');

    const response = await contract.tokenURI(Number(tokenId));

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
};

export namespace FleekERC721 {
  export type MintParams = {
    name: string;
    description: string;
    owner: string;
    externalUrl: string;
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
}
