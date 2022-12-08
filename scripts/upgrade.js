// npx hardhat run scripts/upgrade.js --network polygonMumbai

// TODO: make this arguments
const contractAddress = '0x91A425C1CA320A99a09BE1bee114Fce5d30153d9';
const params = [
  3, // tokenId
  '97e7908f70f0862d753c66689ff09e70caa43df2', // commit hash
  'https://github.com/org/new-repo', // repo
  'new-author', // author
];

(async () => {
  const contract = await hre.ethers.getContractAt(
    'FleekERC721',
    contractAddress
  );

  const transaction = await contract.setTokenBuild(...params);

  console.log('Response: ', transaction);
})();
