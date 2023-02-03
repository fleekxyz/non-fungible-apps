import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures, parseTokenURI } from './helpers';

const { CollectionParams, Roles } = TestConstants;

describe('Token Roles', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.withMint>>;

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.withMint);
  });

  it('should match the token owner', async () => {
    const { contract, owner, tokenId } = fixture;
    const tokenOwner = await contract.ownerOf(tokenId);
    expect(tokenOwner).to.equal(owner.address);
  });

  it('should match the owner role for minter', async () => {
    const { contract, owner, tokenId } = fixture;
    const hasRole = await contract.hasTokenRole(
      tokenId,
      Roles.Owner,
      owner.address
    );

    expect(hasRole).to.be.true;
  });

  it('should add a new controller', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      Roles.Controller,
      otherAccount.address
    );

    expect(
      await contract.hasTokenRole(
        tokenId,
        Roles.Controller,
        otherAccount.address
      )
    ).to.be.true;
  });

  it('should add a list of controllers', async () => {
    const { contract, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      Roles.Controller,
      '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
    );
    await contract.grantTokenRole(
      tokenId,
      Roles.Controller,
      '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3'
    );

    expect(
      await contract.getTokenRoleMembers(tokenId, Roles.Controller)
    ).to.eql([
      '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
      '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3',
    ]);
  });

  it('should add a list of owners', async () => {
    const { contract, owner, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      Roles.Owner,
      '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
    );
    await contract.grantTokenRole(
      tokenId,
      Roles.Owner,
      '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3'
    );

    expect(await contract.getTokenRoleMembers(tokenId, Roles.Owner)).to.eql([
      owner.address,
      '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
      '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3',
    ]);
  });

  it('should not match the owner role for other account', async () => {
    const { contract, otherAccount, tokenId } = fixture;
    const hasRole = await contract.hasTokenRole(
      tokenId,
      Roles.Owner,
      otherAccount.address
    );

    expect(hasRole).to.be.false;
  });

  it('should remove an added controller', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      Roles.Controller,
      otherAccount.address
    );
    await contract.revokeTokenRole(
      tokenId,
      Roles.Controller,
      otherAccount.address
    );

    expect(
      await contract.hasTokenRole(
        tokenId,
        Roles.Controller,
        otherAccount.address
      )
    ).to.be.false;
  });

  it('should transfer the token owner role', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await contract.transferFrom(owner.address, otherAccount.address, tokenId);

    expect(await contract.ownerOf(tokenId)).to.equal(otherAccount.address);
    expect(
      await contract.hasTokenRole(tokenId, Roles.Owner, otherAccount.address)
    ).to.be.true;
    expect(await contract.hasTokenRole(tokenId, Roles.Owner, owner.address)).to
      .be.false;
  });

  it('should clean the token controller list after transfer', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      Roles.Controller,
      otherAccount.address
    );
    await contract.transferFrom(owner.address, otherAccount.address, tokenId);

    expect(await contract.getTokenRoleMembers(tokenId, 1)).to.eql([]);
  });

  it('should not be able to add address role', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await expect(
      contract
        .connect(otherAccount)
        .grantTokenRole(tokenId, Roles.Owner, otherAccount.address)
    ).to.be.revertedWith('FleekAccessControl: must have token role');

    await expect(
      contract
        .connect(otherAccount)
        .grantTokenRole(tokenId, Roles.Controller, otherAccount.address)
    ).to.be.revertedWith('FleekAccessControl: must have token role');
  });

  it('should not be able to remove address role', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await expect(
      contract
        .connect(otherAccount)
        .revokeTokenRole(tokenId, Roles.Owner, otherAccount.address)
    ).to.be.revertedWith('FleekAccessControl: must have token role');

    await expect(
      contract
        .connect(otherAccount)
        .revokeTokenRole(tokenId, Roles.Controller, otherAccount.address)
    ).to.be.revertedWith('FleekAccessControl: must have token role');
  });

  it('should be able to add token role after owner role granted', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await contract.grantTokenRole(tokenId, Roles.Owner, otherAccount.address);

    expect(
      await contract
        .connect(otherAccount)
        .grantTokenRole(tokenId, Roles.Controller, otherAccount.address)
    ).to.not.be.reverted;
  });

  it('should emit event when token role is granted', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await expect(
      contract.grantTokenRole(tokenId, Roles.Controller, otherAccount.address)
    )
      .to.emit(contract, 'TokenRoleGranted')
      .withArgs(tokenId, Roles.Controller, otherAccount.address, owner.address);
  });

  it('should emit event when token role is revoked', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      Roles.Controller,
      otherAccount.address
    );
    await expect(
      contract.revokeTokenRole(tokenId, Roles.Controller, otherAccount.address)
    )
      .to.emit(contract, 'TokenRoleRevoked')
      .withArgs(tokenId, Roles.Controller, otherAccount.address, owner.address);
  });
});
