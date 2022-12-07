require('dotenv').config();

// TODO: make this arguments
const contractAddress = '0x91A425C1CA320A99a09BE1bee114Fce5d30153d9';
const params = [
  '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049', // to
  'Fleek App', // name
  'Description', // description
  'https://fleek.network/fleek-network-logo-minimal.png', // image
  'https://fleek.co/', // external url
  'fleek.eth', // ens
  '6ea6ad16c46ae85faced7e50555ff7368422f57', // commit hash
  'https://github.com/org/repo', // repo
  'fleek', // author
];

(async () => {
  const contract = await hre.ethers.getContractAt(
    'FleekERC721',
    contractAddress
  );

  const transaction = await contract.mint(...params);

  console.log('Response: ', transaction);
})();
