export type SiteNFT = {
  name: string;
  description: string;
  owner: string;
  externalUrl: string;
  image: string;
  ens: string;
  commitHash: string;
  repo: string;
  controllerAddress?: string;
};

export type SiteNFTDetails = SiteNFT & {
  tokenId: number;
};

