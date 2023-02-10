import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures, Errors } from './helpers';

const { CollectionRoles } = TestConstants;

describe('FleekERC721.CollectionRoles', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.default>>;

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.default);
  });

  it('should assign the owner of the contract on contract creation', async () => {
    const { owner, contract } = fixture;

    expect(
      await contract.hasCollectionRole(CollectionRoles.Owner, owner.address)
    ).to.be.true;
  });

  it('should assign owner role to address', async () => {
    const { otherAccount, contract } = fixture;

    await contract.grantCollectionRole(
      CollectionRoles.Owner,
      otherAccount.address
    );

    expect(
      await contract.hasCollectionRole(
        CollectionRoles.Owner,
        otherAccount.address
      )
    ).to.be.true;
  });

  it('should remove an assigned controller', async () => {
    const { otherAccount, contract } = fixture;

    await contract.grantCollectionRole(
      CollectionRoles.Owner,
      otherAccount.address
    );
    await contract.revokeCollectionRole(
      CollectionRoles.Owner,
      otherAccount.address
    );

    expect(
      await contract.hasCollectionRole(
        CollectionRoles.Owner,
        otherAccount.address
      )
    ).to.be.false;
  });

  it('should fetch the list of owners', async () => {
    const { owner, contract, otherAccount } = fixture;

    await contract.grantCollectionRole(
      CollectionRoles.Owner,
      otherAccount.address
    );
    await contract.grantCollectionRole(
      CollectionRoles.Owner,
      '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
    );

    expect(
      await contract.hasCollectionRole(
        CollectionRoles.Owner,
        otherAccount.address
      )
    ).to.be.true;

    expect(
      await contract.hasCollectionRole(
        CollectionRoles.Owner,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
      )
    ).to.be.true;
  });

  it('should not be able to add new owner', async () => {
    const { otherAccount, contract } = fixture;

    await expect(
      contract
        .connect(otherAccount)
        .grantCollectionRole(CollectionRoles.Owner, otherAccount.address)
    )
      .to.be.revertedWithCustomError(contract, Errors.MustHaveCollectionRole)
      .withArgs(CollectionRoles.Owner);
  });

  it('should be able to add roles after owner being granted', async () => {
    const { otherAccount, contract } = fixture;

    await contract.grantCollectionRole(
      CollectionRoles.Owner,
      otherAccount.address
    );

    await expect(
      contract
        .connect(otherAccount)
        .grantCollectionRole(
          CollectionRoles.Owner,
          '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
        )
    ).to.not.be.reverted;
  });

  it('should emit event when role is granted', async () => {
    const { owner, contract, otherAccount } = fixture;

    await expect(
      contract.grantCollectionRole(CollectionRoles.Owner, otherAccount.address)
    )
      .to.emit(contract, 'CollectionRoleGranted')
      .withArgs(CollectionRoles.Owner, otherAccount.address, owner.address);
  });

  it('should emit event when role is revoked', async () => {
    const { owner, contract, otherAccount } = fixture;

    await contract.grantCollectionRole(
      CollectionRoles.Owner,
      otherAccount.address
    );

    await expect(
      contract.revokeCollectionRole(CollectionRoles.Owner, otherAccount.address)
    )
      .to.emit(contract, 'CollectionRoleRevoked')
      .withArgs(CollectionRoles.Owner, otherAccount.address, owner.address);
  });
});
