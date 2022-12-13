const mockDetail = {
  name: 'Fleek Test App',
  ownerAddress: '0x8f7b9e1b5f1f2c3c1f8b0b1b2e1b2f1f2c3c1f8b',
  description:
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: 'https://storageapi.fleek.co/fleek-team-bucket/site/fleek-logo.png',
  // image:
  //   'https://i.seadn.io/gae/Z0t4BsFONk8ebFnTtog3ricAhEpW_ZPhyhxcjHpofCmslJUc5jQ0OjxUuJbU5-3XE0rJZFf6JVdPFZYqtqyg2ri4gAGRpfwkFcidpw4?auto=format&w=1000',
  externalUrl: 'https://fleek.co',
  ens: 'fleek.eth',
  commitHash: '6ea6ad16c46ae85faced7e50555ff7368422f57',
  githubRepo: 'https://github.com/fleekxyz/contracts',
  tokenId: 1,
};

export const fetchSiteDetail = async (tokenId: string) => {
  //TODO get site detail from api
  return new Promise((resolved, reject) => {
    setTimeout(() => {
      resolved({
        data: mockDetail,
      });
    }, 2500);
  });
};

