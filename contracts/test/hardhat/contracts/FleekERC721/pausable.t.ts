import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures, Errors } from './helpers';

const { MintParams, CollectionRoles, TokenRoles } = TestConstants;

describe('FleekERC721.Pausable', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.default>>;

  const mint = () => {
    const { owner, contract } = fixture;

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
      false
    );
  };

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.default);
  });

  it('should be initalized as paused and pausable', async () => {
    const { contract } = fixture;

    expect(await contract.isPaused()).to.be.false;
    expect(await contract.isPausable()).to.be.true;
  });

  it('should unpause', async () => {
    const { contract } = fixture;

    await contract.pause();
    await contract.unpause();

    expect(await contract.isPaused()).to.be.false;
  });

  it('should pause', async () => {
    const { contract } = fixture;

    await contract.pause();

    expect(await contract.isPaused()).to.be.true;
  });

  it('should not allow pause if is paused', async () => {
    const { contract } = fixture;

    await contract.pause();

    await expect(contract.pause()).to.be.revertedWithCustomError(
      contract,
      Errors.ContractIsPaused
    );
  });

  it('should not allow unpause if is not paused', async () => {
    const { contract } = fixture;

    await expect(contract.unpause()).to.be.revertedWithCustomError(
      contract,
      Errors.ContractIsNotPaused
    );
  });

  it('should unpause when contract is not pausable', async () => {
    const { contract } = fixture;

    await contract.pause();
    await contract.setPausable(false);
    await contract.unpause();

    expect(await contract.isPaused()).to.be.false;
  });

  it('should not allow pause when contract is not pausable', async () => {
    const { contract } = fixture;

    await contract.setPausable(false);

    await expect(contract.pause()).to.be.revertedWithCustomError(
      contract,
      Errors.ContractIsNotPausable
    );
  });

  it('should not allow set pausable if is already set', async () => {
    const { contract } = fixture;

    await expect(contract.setPausable(true))
      .to.be.revertedWithCustomError(contract, Errors.PausableIsSetTo)
      .withArgs(true);

    await contract.setPausable(false);

    await expect(contract.setPausable(false))
      .to.be.revertedWithCustomError(contract, Errors.PausableIsSetTo)
      .withArgs(false);
  });

  it('should not allow call functions when paused', async () => {
    const { contract, owner, otherAccount } = fixture;
    const tokenId = (await mint()).value.toNumber();
    await contract.pause();

    await expect(mint()).to.be.revertedWithCustomError(
      contract,
      Errors.ContractIsPaused
    );

    await expect(contract.burn(tokenId)).to.be.revertedWithCustomError(
      contract,
      Errors.ContractIsPaused
    );

    await expect(
      contract.transferFrom(owner.address, otherAccount.address, tokenId)
    ).to.be.revertedWithCustomError(contract, Errors.ContractIsPaused);

    await expect(
      contract.addAccessPoint(tokenId, 'accesspoint.com')
    ).to.be.revertedWithCustomError(contract, Errors.ContractIsPaused);

    await expect(
      contract.removeAccessPoint('accesspoint.com')
    ).to.be.revertedWithCustomError(contract, Errors.ContractIsPaused);

    await expect(
      contract.grantCollectionRole(CollectionRoles.Owner, otherAccount.address)
    ).to.be.revertedWithCustomError(contract, Errors.ContractIsPaused);

    await expect(
      contract.revokeCollectionRole(CollectionRoles.Owner, otherAccount.address)
    ).to.be.revertedWithCustomError(contract, Errors.ContractIsPaused);

    await expect(
      contract.grantTokenRole(
        CollectionRoles.Owner,
        tokenId,
        otherAccount.address
      )
    ).to.be.revertedWithCustomError(contract, Errors.ContractIsPaused);

    await expect(
      contract.revokeTokenRole(
        CollectionRoles.Owner,
        tokenId,
        otherAccount.address
      )
    ).to.be.revertedWithCustomError(contract, Errors.ContractIsPaused);
  });
});
