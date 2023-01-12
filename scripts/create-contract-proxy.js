const { ethers, upgrades } = require('hardhat');

const contractName = 'FleekERC721';

(async () => {
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await upgrades.deployProxy(Contract, [42]);
  await contract.deployed();
  console.log(`${contractName} deployed to:`, contract.address);
})();
