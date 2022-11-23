async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const SitesNFTs = await ethers.getContractFactory('SitesNFTs');
  const sitesNFTs = await SitesNFTs.deploy('Sites NFTs', 'SNFT');

  console.log('SitesNFTs address:', sitesNFTs.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
