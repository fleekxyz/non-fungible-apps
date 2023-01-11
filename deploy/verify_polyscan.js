const { ethers } = require('hardhat');
require('dotenv').config({ path: '.env' });
require('@nomiclabs/hardhat-etherscan');

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

async function main() {
  // Verify the contract after deploying
  await hre.run('verify:verify', {
    address: CONTRACT_ADDRESS,
    constructorArguments: [
      'FleekNFAs', // Collection name
      'FLKNFA', // Collection symbol
    ],
  });
}
// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
