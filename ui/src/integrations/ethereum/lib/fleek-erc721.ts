import { Ethereum } from '../ethereum';

export const FleekERC721 = {
  async mint(
    {
      owner,
      name,
      description,
      image,
      externalUrl,
      ens,
      commitHash,
      repo,
    }: FleekERC721.MintParams,
    provider: Ethereum.Providers
  ): Promise<void> {
    const contract = Ethereum.getContract('FleekERC721', provider);

    const response = await contract.mint(
      owner,
      name,
      description,
      image,
      externalUrl,
      ens,
      commitHash,
      repo,
      'author'
    );

    return response;
  },

  async tokenMetadata(tokenId: number): Promise<FleekERC721.Metadata> {
    const contract = Ethereum.getContract('FleekERC721');

    const response = await contract.tokenURI(Number(tokenId));

    const parsed = JSON.parse(
      Buffer.from(response.slice(29), 'base64').toString('utf-8')
    );

    return parsed;
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
