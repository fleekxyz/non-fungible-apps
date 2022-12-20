const listSites = [
  {
    tokenId: 1,
    name: 'Fleek Test App',
    owner: '0x1b5b3e8a7c245d0f2d2b2e29ba11c03ef086c06e',
    description:
      'Roronoa Zoro, also known as `Pirate Hunter` Zoro, is the combatant of the Straw Hat Pirates, one of their two swordsmen and one of the Senior Officers of the Straw Hat Grand Fleet. Formerly a bounty hunter, he is the second member of Luffy`s crew and the first to join it, doing so in the Romance Dawn Arc.',
    image:
      'https://i.seadn.io/gae/Z0t4BsFONk8ebFnTtog3ricAhEpW_ZPhyhxcjHpofCmslJUc5jQ0OjxUuJbU5-3XE0rJZFf6JVdPFZYqtqyg2ri4gAGRpfwkFcidpw4?auto=format&w=1000',
    externalUrl: 'https://onepiece.fandom.com/wiki/Roronoa_Zoro',
    ens: 'zoro.eth',
    commitHash: '6ea6ad16c46ae85faced7e50555ff7368422f57',
    githubRepo: 'https://github.com/fleekxyz/contracts',
  },
  {
    tokenId: 2,
    name: 'Fleek Test App',
    owner: '0x1b5b3e8a7c245d0f2d2b2e29ba11c03ef086c06e',
    description:
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://storageapi.fleek.co/fleek-team-bucket/site/fleek-logo.png',
    externalUrl: 'https://fleek.co',
    ens: 'fleek.eth',
    commitHash: '6ea6ad16c46ae85faced7e50555ff7368422f57',
    githubRepo: 'https://github.com/fleekxyz/contracts',
  },
];

export const fetchMintedSites = async () => {
  //TODO get minted sites from api
  return new Promise((resolved) => {
    setTimeout(() => {
      resolved({
        listSites,
      });
    }, 2500);
  });
};
