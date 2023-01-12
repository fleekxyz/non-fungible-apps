import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';

describe('Proxy', function () {
  it('FleekERC721', async () => {
    const Contract = await ethers.getContractFactory('FleekERC721');
    const ContractV2 = await ethers.getContractFactory('FleekERC721');

    const instance = await upgrades.deployProxy(Contract, [42], {
      constructorArgs: ['Fleek', 'FLEEK'],
    });
    const upgraded = await upgrades.upgradeProxy(instance.address, ContractV2);

    const value = await upgraded.value();
    expect(value.toString()).to.equal('42');
  });
});
