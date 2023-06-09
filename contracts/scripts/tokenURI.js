// npx hardhat run scripts/tokenURI.js --network mumbai/sepolia/goerli
const { getContract, parseDataURI } = require('./util');

// TODO: make this arguments
const tokenId = 0;

(async () => {
  const contract = await getContract('FleekERC721');

  const transaction = await contract.tokenURI(tokenId);

  const parsed = parseDataURI(transaction);

  console.log('Response: ', parsed);
})();
