import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';

describe('Proxy', function () {
  it('FleekERC721', async () => {
    const Contract = await ethers.getContractFactory('FleekERC721');
    const ContractV2 = await ethers.getContractFactory('FleekERC721');

    const instance = await upgrades.deployProxy(Contract, [
      'Collection Name',
      'SYMBOL',
    ]);
    const upgraded = await upgrades.upgradeProxy(instance.address, ContractV2);

    const name = await upgraded.name();
    const symbol = await upgraded.symbol();
    expect(name).to.equal('Collection Name');
    expect(symbol).to.equal('SYMBOL');
  });
});
