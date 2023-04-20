import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { Errors, Fixtures, TestConstants } from './helpers';

describe('FleekERC721.GetToken', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.withMint>>;

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.withMint);
  });

  it('should mint token in not verified state', async () => {
    const { contract, tokenId } = fixture;

    expect(await contract.isTokenVerified(tokenId)).to.be.false;
  });

  it('should set token to verified state', async () => {
    const { contract, tokenId } = fixture;

    await contract.setTokenVerified(tokenId, true);

    expect(await contract.isTokenVerified(tokenId)).to.be.true;
  });

  it('should set token to verified and unverified states', async () => {
    const { contract, tokenId } = fixture;

    await contract.setTokenVerified(tokenId, true);
    await contract.setTokenVerified(tokenId, false);

    expect(await contract.isTokenVerified(tokenId)).to.be.false;
  });

  it('should revert for non verifier call', async () => {
    const { contract, tokenId, otherAccount } = fixture;

    await expect(contract.connect(otherAccount).setTokenVerified(tokenId, true))
      .to.be.revertedWithCustomError(contract, Errors.MustHaveCollectionRole)
      .withArgs(TestConstants.CollectionRoles.Verifier);
  });

  it('should revert for non token verifier', async () => {
    const { contract, tokenId, otherAccount } = fixture;

    await contract.grantCollectionRole(
      TestConstants.CollectionRoles.Verifier,
      otherAccount.address
    );

    await expect(contract.connect(otherAccount).setTokenVerified(tokenId, true))
      .to.be.revertedWithCustomError(contract, Errors.MustBeTokenVerifier)
      .withArgs(tokenId);
  });
});
