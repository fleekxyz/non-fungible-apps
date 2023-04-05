const { address } = require('../deployments/mumbai/FleekERC721.json');
require('@nomiclabs/hardhat-etherscan');

async function main() {
  // Verify the contract after deploying
  await hre.run('verify:verify', {
    address: address,
    constructorArguments: [],
  });
}
// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
