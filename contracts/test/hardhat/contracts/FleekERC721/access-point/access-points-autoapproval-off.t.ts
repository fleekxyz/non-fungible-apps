import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { TestConstants, Fixtures, Errors } from '../helpers';
const { AccessPointStatus, CollectionRoles } = TestConstants;

describe('FleekERC721.AccessPoints.AutoApprovalOff', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.withMint>>;

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.withMint);
  });

  it('should add an AP with draft status', async () => {
    const { contract, owner, tokenId } = fixture;

    await expect(contract.addAccessPoint(tokenId, 'accesspoint.com'))
      .to.emit(contract, 'NewAccessPoint')
      .withArgs('accesspoint.com', tokenId, owner.address);

    let ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp).to.eql({
      tokenId,
      score: 0,
      owner: owner.address.toLowerCase(),
      contentVerified: false,
      nameVerified: false,
      status: AccessPointStatus.DRAFT,
    });
  });

  it('should return a AP json object', async () => {
    const { contract, owner, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    const ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp).to.eql({
      tokenId,
      score: 0,
      owner: owner.address.toLowerCase(),
      contentVerified: false,
      nameVerified: false,
      status: AccessPointStatus.DRAFT,
    });
  });

  it('should revert if AP does not exist', async () => {
    const { contract } = fixture;

    await expect(
      contract.getAccessPointJSON('accesspoint.com')
    ).to.be.revertedWithCustomError(contract, Errors.AccessPointNotExistent);
  });

  it('should increase the AP score', async () => {
    const { contract, owner, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    await contract.increaseAccessPointScore('accesspoint.com');

    const ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp).to.eql({
      tokenId,
      score: 1,
      owner: owner.address.toLowerCase(),
      contentVerified: false,
      nameVerified: false,
      status: AccessPointStatus.DRAFT,
    });
  });

  it('should decrease the AP score', async () => {
    const { contract, owner, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    await contract.increaseAccessPointScore('accesspoint.com');
    await contract.increaseAccessPointScore('accesspoint.com');
    await contract.decreaseAccessPointScore('accesspoint.com');

    const ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp).to.eql({
      tokenId,
      score: 1,
      owner: owner.address.toLowerCase(),
      contentVerified: false,
      nameVerified: false,
      status: AccessPointStatus.DRAFT,
    });
  });

  it('should allow anyone to change AP score', async () => {
    const { contract, otherAccount, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');
    await contract.increaseAccessPointScore('accesspoint.com');
    await contract
      .connect(otherAccount)
      .increaseAccessPointScore('accesspoint.com');
  });

  it('should remove an AP', async () => {
    const { contract, owner, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    await expect(contract.removeAccessPoint('accesspoint.com'))
      .to.emit(contract, 'RemoveAccessPoint')
      .withArgs('accesspoint.com', tokenId, owner.address);
  });

  it('should allow only AP owner to remove it', async () => {
    const { contract, otherAccount, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    await expect(
      contract.connect(otherAccount).removeAccessPoint('accesspoint.com')
    ).to.be.revertedWithCustomError(contract, Errors.MustBeAccessPointOwner);
  });

  it('should not be allowed to add the same AP more than once', async () => {
    const { contract, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    await expect(
      contract.addAccessPoint(tokenId, 'accesspoint.com')
    ).to.be.revertedWithCustomError(contract, Errors.AccessPointAlreadyExists);
  });

  it('should change "contentVerified" to true', async () => {
    const { contract, tokenId, verifier } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    await contract
      .connect(verifier)
      .setAccessPointContentVerify('accesspoint.com', true);

    const ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp.contentVerified).to.be.true;
  });

  it('should change "contentVerified" to false', async () => {
    const { contract, tokenId, verifier } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
    const beforeParsedAp = JSON.parse(beforeAp);
    expect(beforeParsedAp.contentVerified).to.be.false;

    await contract
      .connect(verifier)
      .setAccessPointContentVerify('accesspoint.com', true);
    await contract
      .connect(verifier)
      .setAccessPointContentVerify('accesspoint.com', false);

    const ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp.contentVerified).to.be.false;
  });

  it('should change "nameVerified" to true', async () => {
    const { contract, tokenId, verifier } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    await contract
      .connect(verifier)
      .setAccessPointNameVerify('accesspoint.com', true);

    const ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp.nameVerified).to.be.true;
  });

  it('should change "nameVerified" to false', async () => {
    const { contract, tokenId, verifier } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
    const beforeParsedAp = JSON.parse(beforeAp);
    expect(beforeParsedAp.nameVerified).to.be.false;

    await contract
      .connect(verifier)
      .setAccessPointNameVerify('accesspoint.com', true);
    await contract
      .connect(verifier)
      .setAccessPointNameVerify('accesspoint.com', false);

    const ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp.nameVerified).to.be.false;
  });

  it('should token owner be able to change the auto approval settings to on', async () => {
    const { contract, tokenId, owner } = fixture;

    await contract.connect(owner).setAccessPointAutoApproval(tokenId, true);

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
    const beforeParsedAp = JSON.parse(beforeAp);

    expect(beforeParsedAp.status).to.be.eql(AccessPointStatus.APPROVED); //APPROVED STATUS
  });

  it('should token owner be able to approve a draft ap', async () => {
    const { contract, tokenId, owner } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
    const beforeParsedAp = JSON.parse(beforeAp);
    expect(beforeParsedAp.status).to.be.eql(AccessPointStatus.DRAFT); //DRAFT STATUS

    await contract
      .connect(owner)
      .setApprovalForAccessPoint(tokenId, 'accesspoint.com', true);

    const afterAp = await contract.getAccessPointJSON('accesspoint.com');
    const afterParsedAp = JSON.parse(afterAp);
    expect(afterParsedAp.status).to.be.eql(AccessPointStatus.APPROVED); //APPROVED STATUS
  });

  it('should token owner be able to reject a draft ap', async () => {
    const { contract, tokenId, owner } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
    const beforeParsedAp = JSON.parse(beforeAp);
    expect(beforeParsedAp.status).to.be.eql(AccessPointStatus.DRAFT); //DRAFT STATUS

    await contract
      .connect(owner)
      .setApprovalForAccessPoint(tokenId, 'accesspoint.com', false);

    const afterAp = await contract.getAccessPointJSON('accesspoint.com');
    const afterParsedAp = JSON.parse(afterAp);

    expect(afterParsedAp.status).to.be.eql(AccessPointStatus.REJECTED); //REJECTED STATUS
  });
});
