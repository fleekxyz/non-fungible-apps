import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures, parseTokenURI, Errors } from './helpers';

const { TokenRoles } = TestConstants;

describe('FleekERC721.TokenRoles', () => {
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
    const tokenOwner = await contract.ownerOf(tokenId);

    expect(tokenOwner).to.be.equal(owner.address);
  });

  it('should add a new controller', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      TokenRoles.Controller,
      otherAccount.address
    );

    expect(
      await contract.hasTokenRole(
        tokenId,
        TokenRoles.Controller,
        otherAccount.address
      )
    ).to.be.true;
  });

  it('should add a list of controllers', async () => {
    const { contract, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      TokenRoles.Controller,
      '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
    );
    await contract.grantTokenRole(
      tokenId,
      TokenRoles.Controller,
      '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3'
    );

    expect(
      await contract.hasTokenRole(
        tokenId,
        TokenRoles.Controller,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
      )
    ).to.be.true;
    expect(
      await contract.hasTokenRole(
        tokenId,
        TokenRoles.Controller,
        '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3'
      )
    ).to.be.true;
  });

  it('should not match the owner role for other account', async () => {
    const { contract, otherAccount, tokenId } = fixture;
    const tokenOwner = await contract.ownerOf(tokenId);

    expect(tokenOwner).to.not.be.equal(otherAccount.address);
  });

  it('should remove an added controller', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      TokenRoles.Controller,
      otherAccount.address
    );
    await contract.revokeTokenRole(
      tokenId,
      TokenRoles.Controller,
      otherAccount.address
    );

    expect(
      await contract.hasTokenRole(
        tokenId,
        TokenRoles.Controller,
        otherAccount.address
      )
    ).to.be.false;
  });

  it('should transfer the token owner role', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await contract.transferFrom(owner.address, otherAccount.address, tokenId);

    expect(await contract.ownerOf(tokenId)).to.equal(otherAccount.address);
  });

  it('should clean the token controller list after transfer', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      TokenRoles.Controller,
      otherAccount.address
    );
    await contract.transferFrom(owner.address, otherAccount.address, tokenId);

    expect(
      await contract.hasTokenRole(
        tokenId,
        TokenRoles.Controller,
        otherAccount.address
      )
    ).to.be.false;
  });

  it('should not be able to add address role', async () => {
    const { contract, otherAccount, tokenId } = fixture;
    await expect(
      contract
        .connect(otherAccount)
        .grantTokenRole(tokenId, TokenRoles.Controller, otherAccount.address)
    ).to.be.revertedWithCustomError(contract, Errors.MustBeTokenOwner);
  });

  it('should not be able to remove address role', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;

    await expect(
      contract
        .connect(otherAccount)
        .revokeTokenRole(tokenId, TokenRoles.Controller, otherAccount.address)
    ).to.be.revertedWithCustomError(contract, Errors.MustBeTokenOwner);
  });

  it('should emit event when token role is granted', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await expect(
      contract.grantTokenRole(
        tokenId,
        TokenRoles.Controller,
        otherAccount.address
      )
    )
      .to.emit(contract, 'TokenRoleGranted')
      .withArgs(
        tokenId,
        TokenRoles.Controller,
        otherAccount.address,
        owner.address
      );
  });

  it('should emit event when token role is revoked', async () => {
    const { contract, owner, otherAccount, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      TokenRoles.Controller,
      otherAccount.address
    );
    await expect(
      contract.revokeTokenRole(
        tokenId,
        TokenRoles.Controller,
        otherAccount.address
      )
    )
      .to.emit(contract, 'TokenRoleRevoked')
      .withArgs(
        tokenId,
        TokenRoles.Controller,
        otherAccount.address,
        owner.address
      );
  });

  it('should not be able to grant role twice', async () => {
    const { contract, otherAccount, tokenId } = fixture;
    await contract.grantTokenRole(
      tokenId,
      TokenRoles.Controller,
      otherAccount.address
    );
    await expect(
      contract.grantTokenRole(
        tokenId,
        TokenRoles.Controller,
        otherAccount.address
      )
    ).to.be.revertedWithCustomError(contract, Errors.RoleAlreadySet);
  });

  it('should not be able to revoke role twice', async () => {
    const { contract, otherAccount, tokenId } = fixture;
    await expect(
      contract.revokeTokenRole(
        tokenId,
        TokenRoles.Controller,
        otherAccount.address
      )
    ).to.be.revertedWithCustomError(contract, Errors.RoleAlreadySet);
  });
});
