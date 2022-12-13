export type SiteNFT = {
  name: string;
  description: string;
  owner: string;
  externalUrl: string;
  image: string;
  ens?: string;
  commitHash: string;
  repo: string;
};

export type SiteNFTDetail = SiteNFT & {
  tokenId: number;
};

