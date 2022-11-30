async function main() {
  const FleekERC721 = await ethers.getContractFactory("FleekERC721");

  // Start deployment, returning a promise that resolves to a contract object
  const Fleek_ERC721 = await FleekERC721.deploy("Test Name", "FLKST");   
  console.log("Contract deployed to address:", Fleek_ERC721.address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });