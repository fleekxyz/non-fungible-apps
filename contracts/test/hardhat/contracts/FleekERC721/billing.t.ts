import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Fixtures, TestConstants, Errors } from './helpers';

const { Billing, MintParams } = TestConstants;

describe('FleekERC721.Billing', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.withMint>>;
  const mintPrice = ethers.utils.parseEther('1');
  const addAPPrice = ethers.utils.parseEther('1');

  const mint = (value?: any) => {
    const { contract, owner } = fixture;
    return contract.mint(
      owner.address,
      MintParams.name,
      MintParams.description,
      MintParams.externalUrl,
      MintParams.ens,
      MintParams.commitHash,
      MintParams.gitRepository,
      MintParams.logo,
      MintParams.color,
      MintParams.accessPointAutoApprovalSettings,
      owner.address,
      { value }
    );
  };

  const addAP = (value?: any) => {
    const { contract } = fixture;
    return contract.addAccessPoint(0, 'random.com', { value });
  };

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

  it('should allow mint with transfer', async () => {
    const { contract, owner } = fixture;
    await mint(mintPrice);
    console.log('hit');
    expect(await contract.ownerOf(0)).to.equal(owner.address);
  });

  it('should not allow mint with empty value', async () => {
    const { contract } = fixture;
    await expect(mint())
      .to.be.revertedWithCustomError(contract, Errors.RequiredPayment)
      .withArgs(mintPrice);
  });

  it('should not allow mint with different value', async () => {
    const { contract } = fixture;
    await expect(mint(ethers.utils.parseEther('2')))
      .to.be.revertedWithCustomError(contract, Errors.RequiredPayment)
      .withArgs(mintPrice);
  });

  it('should allow add access point with transfer', async () => {
    const { contract } = fixture;
    await addAP(addAPPrice);
    expect(await contract.getAccessPointJSON('random.com')).to.exist;
  });

  it('should not allow add access point with empty value', async () => {
    const { contract } = fixture;
    await expect(addAP())
      .to.be.revertedWithCustomError(contract, Errors.RequiredPayment)
      .withArgs(addAPPrice);
  });

  it('should not allow add access point with different value', async () => {
    const { contract } = fixture;
    await expect(addAP(ethers.utils.parseEther('2')))
      .to.be.revertedWithCustomError(contract, Errors.RequiredPayment)
      .withArgs(addAPPrice);
  });
});
