// npx hardhat run scripts/upgrade.js --network sepolia
const { getContract } = require('./util');

// TODO: make this arguments
const params = [
  1, // tokenId
  '97e7908f70f0862d753c66689ff09e70caa43df2', // commit hash
  'https://github.com/org/new-repo', // repo
  'new-author', // author
];

(async () => {
  const contract = await getContract('FleekERC721');

  const transaction = await contract.setTokenBuild(...params);

  console.log('Response: ', transaction);
})();
