const MINT_PARAMS = {
  name: 'Fleek Test App',
  description: 'Fleek Test App Description',
  image: 'https://storageapi.fleek.co/fleek-team-bucket/site/fleek-logo.png',
  ens: 'fleek.eth',
  externalUrl: 'https://fleek.co',
  commitHash: 'b72e47171746b6a9e29b801af9cb655ecf4d665c',
  gitRepository: 'https://github.com/fleekxyz/non-fungible-apps',
};

const mockDetail = {
  owner: '0x8f7b9e1b5f1f2c3c1f8b0b1b2e1b2f1f2c3c1f8b',
  name: MINT_PARAMS.name,
  description: MINT_PARAMS.description,
  image: MINT_PARAMS.image,
  external_url: MINT_PARAMS.externalUrl,
  attributes: [
    {
      trait_type: 'ENS',
      value: MINT_PARAMS.ens,
    },
    {
      trait_type: 'Commit Hash',
      value: MINT_PARAMS.commitHash,
    },
    {
      trait_type: 'Repository',
      value: MINT_PARAMS.gitRepository,
    },
    {
      trait_type: 'Version',
      value: '0',
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type
export const fetchSiteDetail = async (tokenId: string) => {
  return new Promise((resolved) => {
    setTimeout(() => {
      resolved({
        data: { ...mockDetail, externalUrl: mockDetail.external_url },
      });
    }, 2500);
  });
};
