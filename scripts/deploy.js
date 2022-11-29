const argv = require('minimist')(process.argv.slice(2));
const contractName = argv.contract;
const params = argv.param || [];

if (!contractName) {
  console.log('No contract name provided');
  process.exit(1);
}

async function main() {
  console.log('Deploying contract:', contractName);
  console.log('With params:', params);

  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  // const factory = await ethers.getContractFactory(contractName);

  // // Start deployment, returning a promise that resolves to a contract object
  // const contract = await factory.deploy(...params);
  // console.log('Contract deployed to address:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
