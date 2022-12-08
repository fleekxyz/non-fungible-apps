// npx hardhat run scripts/tokenURI.js --network mumbai

// TODO: make this arguments
const contractAddress = '0x91A425C1CA320A99a09BE1bee114Fce5d30153d9';
const tokenId = 3;

(async () => {
  const contract = await hre.ethers.getContractAt(
    'FleekERC721',
    contractAddress
  );

  const transaction = await contract.tokenURI(tokenId);

  const parsed = JSON.parse(
    Buffer.from(transaction.slice(29), 'base64').toString('utf-8')
  );

  console.log('Response: ', parsed);
})();
