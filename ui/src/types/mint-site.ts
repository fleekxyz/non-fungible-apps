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

export type SiteNFTDetail = Omit<SiteNFT, 'ens' | 'commitHash' | 'repo'> & {
  attributes: [
    {
      trait_type: string;
      value: string;
    }
  ];
};

