// npx hardhat run scripts/tokenURI.js --network mumbai
const { getContract } = require('./util');

// TODO: make this arguments
const tokenId = 0;

(async () => {
  const contract = await getContract('FleekERC721');

  const transaction = await contract.tokenURI(tokenId);

  const parsed = JSON.parse(
    Buffer.from(transaction.slice(29), 'base64').toString('utf-8')
  );

  console.log('Response: ', parsed);
})();
