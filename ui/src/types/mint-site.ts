export type SiteNFT = {
  name: string;
  description: string;
  owner: string;
  externalUrl: string;
  image?: File;
  ens: string;
  commitHash: string;
  repo: string;
  controllerAddress?: string;
};

