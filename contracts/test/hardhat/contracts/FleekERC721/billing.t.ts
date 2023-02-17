import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Fixtures, TestConstants } from './helpers';

const { Billing } = TestConstants;

describe('FleekERC721.Billing', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.withMint>>;
  const mintPrice = ethers.utils.parseEther('1');
  const addAPPrice = ethers.utils.parseEther('1');

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.withMint);
    const { contract } = fixture;
    await contract.setBilling(Billing.Mint, mintPrice);
    await contract.setBilling(Billing.AddAccessPoint, addAPPrice);
  });

  it('should start with mint prices', async () => {
    const { contract } = fixture;
    expect(await contract.getBilling(Billing.Mint)).to.equal(mintPrice);
    expect(await contract.getBilling(Billing.AddAccessPoint)).to.equal(
      addAPPrice
    );
  });
});
