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
      MintParams.externalUrl,
      MintParams.ens,
      MintParams.commitHash,
      MintParams.gitRepository,
      MintParams.logo,
      MintParams.color
    );

    expect(response.value).to.be.instanceOf(ethers.BigNumber);
    expect(response.value.toNumber()).to.equal(0);
  });

  it('should not be able to mint a new token if not the owner', async () => {
    const { otherAccount, contract } = await loadFixture(Fixtures.default);

    await expect(
      contract
        .connect(otherAccount)
        .mint(
          otherAccount.address,
          MintParams.name,
          MintParams.description,
          MintParams.externalUrl,
          MintParams.ens,
          MintParams.commitHash,
          MintParams.gitRepository,
          MintParams.logo,
          MintParams.color
        )
    )
      .to.be.revertedWithCustomError(contract, Errors.MustHaveCollectionRole)
      .withArgs(CollectionRoles.Owner);
  });

  it('should have address to as owner', async () => {
    const { owner, otherAccount, contract } = await loadFixture(
      Fixtures.default
    );

    const response = await contract.mint(
      owner.address,
      MintParams.name,
      MintParams.description,
      MintParams.externalUrl,
      MintParams.ens,
      MintParams.commitHash,
      MintParams.gitRepository,
      MintParams.logo,
      MintParams.color
    );

    const tokenId = response.value.toNumber();

    expect(await contract.ownerOf(tokenId)).to.equal(owner.address);
    expect(await contract.ownerOf(tokenId)).not.to.equal(otherAccount.address);
  });
});
