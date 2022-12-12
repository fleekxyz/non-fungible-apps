const mockDetail = {
  name: 'Fleek Test App',
  description:
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: 'https://storageapi.fleek.co/fleek-team-bucket/site/fleek-logo.png',
  externalUrl: 'https://fleek.co',
  ens: 'fleek.eth',
  commitHash: '6ea6ad16c46ae85faced7e50555ff7368422f57',
  githubRepo: 'https://github.com/fleekxyz/contracts',
};

export const fetchSiteDetail = async (tokenId: string) => {
  //TODO get site detail from api
  return new Promise((resolved) => {
    setTimeout(() => {
      resolved({
        data: mockDetail,
      });
    }, 2500);
  });
};

