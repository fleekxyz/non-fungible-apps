// npx hardhat run scripts/mint.js --network mumbai
const { getContract } = require('./util');

// TODO: make this arguments
const params = [
  '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049', // to
  'Fleek App', // name
  'Description', // description
  'https://fleek.co/', // external url
  'fleek.eth', // ens
  '6ea6ad16c46ae85faced7e50555ff7368422f57', // commit hash
  'https://github.com/org/repo', // repo
];

(async () => {
  const contract = await getContract('FleekERC721');

  const transaction = await contract.mint(...params);

  console.log('Response: ', transaction);
})();
