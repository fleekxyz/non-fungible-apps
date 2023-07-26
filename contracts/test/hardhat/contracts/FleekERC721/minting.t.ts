import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures, Errors } from './helpers';
import { ethers } from 'hardhat';

const { MintParams, CollectionRoles } = TestConstants;

describe('FleekERC721.Minting', () => {
  it('should be able to mint a new token', async () => {
    const { owner, contract } = await loadFixture(Fixtures.default);

    const response = await contract.mint(
      owner.address,
      MintParams.name,
      MintParams.description,
      MintParams.ens,
      MintParams.logo,
      MintParams.color,
      TestConstants.MintParams.category,
      TestConstants.MintParams.build,
      owner.address
    );

    expect(response.value).to.be.instanceOf(ethers.BigNumber);
    expect(response.value.toNumber()).to.equal(0);
  });

  it('should have address to as owner', async () => {
    const { owner, otherAccount, contract } = await loadFixture(
      Fixtures.default
    );

    const response = await contract.mint(
      owner.address,
      MintParams.name,
      MintParams.description,
      MintParams.ens,
      MintParams.logo,
      MintParams.color,
      TestConstants.MintParams.category,
      TestConstants.MintParams.build,
      owner.address
    );

    const tokenId = response.value.toNumber();

    expect(await contract.ownerOf(tokenId)).to.equal(owner.address);
    expect(await contract.ownerOf(tokenId)).not.to.equal(otherAccount.address);
  });

  it('should not allow minting with non verifier account param', async () => {
    const { owner, otherAccount, contract } = await loadFixture(
      Fixtures.default
    );

    await expect(
      contract.mint(
        owner.address,
        MintParams.name,
        MintParams.description,
        MintParams.ens,
        MintParams.logo,
        MintParams.color,
        TestConstants.MintParams.category,
        TestConstants.MintParams.build,
        otherAccount.address
      )
    )
      .to.be.revertedWithCustomError(contract, Errors.MustHaveCollectionRole)
      .withArgs(CollectionRoles.Verifier);
  });

  it('should allow minting with empty ens', async () => {
    const { owner, contract } = await loadFixture(Fixtures.default);

    const response = await contract.mint(
      owner.address,
      MintParams.name,
      MintParams.description,
      '',
      MintParams.logo,
      MintParams.color,
      TestConstants.MintParams.category,
      TestConstants.MintParams.build,
      owner.address
    );

    expect(response.value).to.be.instanceOf(ethers.BigNumber);
    expect(response.value.toNumber()).to.equal(0);
  });
});
