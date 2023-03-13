import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures, OverloadedFunctions } from './helpers';
import { ethers } from 'hardhat';

const { MintParams } = TestConstants;

describe('FleekERC721.Minting', () => {
  it('should be able to mint a new token', async () => {
    const { owner, contract } = await loadFixture(Fixtures.default);

    const response = await contract[OverloadedFunctions.Mint.Default](
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
      owner.address
    );

    expect(response.value).to.be.instanceOf(ethers.BigNumber);
    expect(response.value.toNumber()).to.equal(0);
  });

  it('should have address to as owner', async () => {
    const { owner, otherAccount, contract } = await loadFixture(
      Fixtures.default
    );

    const response = await contract[OverloadedFunctions.Mint.Default](
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
      owner.address
    );

    const tokenId = response.value.toNumber();

    expect(await contract.ownerOf(tokenId)).to.equal(owner.address);
    expect(await contract.ownerOf(tokenId)).not.to.equal(otherAccount.address);
  });
});
