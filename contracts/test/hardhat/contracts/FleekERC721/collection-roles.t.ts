import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures } from './helpers';

const { Roles } = TestConstants;

describe('FleekERC721.CollectionRoles', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.default>>;

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.default);
  });

  it('should assign the owner of the contract on contract creation', async () => {
    const { owner, contract } = fixture;

    expect(await contract.hasCollectionRole(Roles.Owner, owner.address)).to.be
      .true;
  });

  it('should assign owner role to address', async () => {
    const { otherAccount, contract } = fixture;

    await contract.grantCollectionRole(Roles.Owner, otherAccount.address);

    expect(await contract.hasCollectionRole(Roles.Owner, otherAccount.address))
      .to.be.true;
  });

  it('should assign controller role to address', async () => {
    const { owner, contract } = fixture;

    await contract.grantCollectionRole(Roles.Controller, owner.address);

    expect(await contract.hasCollectionRole(Roles.Controller, owner.address)).to
      .be.true;
  });

  it('should remove an assigned controller', async () => {
    const { otherAccount, contract } = fixture;

    await contract.grantCollectionRole(Roles.Owner, otherAccount.address);
    await contract.revokeCollectionRole(Roles.Owner, otherAccount.address);

    expect(await contract.hasCollectionRole(Roles.Owner, otherAccount.address))
      .to.be.false;
  });

  it('should remove an assigned controller', async () => {
    const { owner, contract } = fixture;

    await contract.grantCollectionRole(Roles.Controller, owner.address);
    await contract.revokeCollectionRole(Roles.Controller, owner.address);

    expect(await contract.hasCollectionRole(Roles.Controller, owner.address)).to
      .be.false;
  });

  it('should fetch the list of controllers', async () => {
    const { owner, contract } = fixture;

    await contract.grantCollectionRole(Roles.Controller, owner.address);
    await contract.grantCollectionRole(
      Roles.Controller,
      '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
    );

    expect(await contract.getCollectionRoleMembers(Roles.Controller)).to.eql([
      owner.address,
      '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
    ]);
  });

  it('should fetch the list of owners', async () => {
    const { owner, contract, otherAccount } = fixture;

    await contract.grantCollectionRole(Roles.Owner, otherAccount.address);
    await contract.grantCollectionRole(
      Roles.Owner,
      '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
    );

    expect(await contract.getCollectionRoleMembers(Roles.Owner)).to.eql([
      owner.address,
      otherAccount.address,
      '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
    ]);
  });

  it('should not be able to add new owner', async () => {
    const { otherAccount, contract } = fixture;

    await expect(
      contract
        .connect(otherAccount)
        .grantCollectionRole(Roles.Owner, otherAccount.address)
    ).to.be.revertedWith('FleekAccessControl: must have collection role');
  });

  it('should not be able to add new controller', async () => {
    const { otherAccount, contract } = fixture;

    await expect(
      contract
        .connect(otherAccount)
        .grantCollectionRole(Roles.Controller, otherAccount.address)
    ).to.be.revertedWith('FleekAccessControl: must have collection role');
  });

  it('should be able to add roles after owner being granted', async () => {
    const { otherAccount, contract } = fixture;

    await contract.grantCollectionRole(Roles.Owner, otherAccount.address);

    await expect(
      contract
        .connect(otherAccount)
        .grantCollectionRole(Roles.Controller, otherAccount.address)
    ).to.not.be.reverted;
    await expect(
      contract
        .connect(otherAccount)
        .revokeCollectionRole(Roles.Controller, otherAccount.address)
    ).to.not.be.reverted;
  });

  it('should not be able to change roles for controllers', async () => {
    const { owner, otherAccount, contract } = fixture;

    await contract.grantCollectionRole(Roles.Controller, otherAccount.address);

    await expect(
      contract
        .connect(otherAccount)
        .grantCollectionRole(Roles.Owner, owner.address)
    ).to.be.revertedWith('FleekAccessControl: must have collection role');
    await expect(
      contract
        .connect(otherAccount)
        .revokeCollectionRole(Roles.Owner, owner.address)
    ).to.be.revertedWith('FleekAccessControl: must have collection role');
  });

  it('should emit event when role is granted', async () => {
    const { owner, contract, otherAccount } = fixture;

    await expect(
      contract.grantCollectionRole(Roles.Controller, otherAccount.address)
    )
      .to.emit(contract, 'CollectionRoleGranted')
      .withArgs(Roles.Controller, otherAccount.address, owner.address);
  });

  it('should emit event when role is revoked', async () => {
    const { owner, contract, otherAccount } = fixture;

    await contract.grantCollectionRole(Roles.Controller, otherAccount.address);

    await expect(
      contract.revokeCollectionRole(Roles.Controller, otherAccount.address)
    )
      .to.emit(contract, 'CollectionRoleRevoked')
      .withArgs(Roles.Controller, otherAccount.address, owner.address);
  });
});
