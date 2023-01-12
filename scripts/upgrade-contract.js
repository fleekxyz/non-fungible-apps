const { ethers, upgrades } = require('hardhat');

const contractName = 'FleekERC721';
const proxyAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

async function main() {
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await upgrades.upgradeProxy(proxyAddress, Contract);
  console.log(`${contractName} upgraded`);
}

main();
