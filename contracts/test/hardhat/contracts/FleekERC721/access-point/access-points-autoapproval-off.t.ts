import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { before } from 'mocha';
import { Fixtures } from '../helpers';

describe('AccessPoints with Auto Approval Off', () => {
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
      status: '0',
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
      status: '0',
    });
  });

  it('should revert if AP does not exist', async () => {
    const { contract, tokenId } = fixture;

    await expect(
      contract.getAccessPointJSON('accesspoint.com')
    ).to.be.revertedWith('FleekERC721: invalid AP');
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
      status: '0',
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
      status: '0',
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
    ).to.be.revertedWith('FleekERC721: must be AP owner');
  });

  it('should not be allowed to add the same AP more than once', async () => {
    const { contract, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    await expect(
      contract.addAccessPoint(tokenId, 'accesspoint.com')
    ).to.be.revertedWith('FleekERC721: AP already exists');
  });

  it('should change "contentVerified" to true', async () => {
    const { contract, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    await contract.setAccessPointContentVerify('accesspoint.com', true);

    const ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp.contentVerified).to.be.true;
  });

  it('should change "contentVerified" to false', async () => {
    const { contract, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
    const beforeParsedAp = JSON.parse(beforeAp);
    expect(beforeParsedAp.contentVerified).to.be.false;

    await contract.setAccessPointContentVerify('accesspoint.com', true);
    await contract.setAccessPointContentVerify('accesspoint.com', false);

    const ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp.contentVerified).to.be.false;
  });

  it('should change "nameVerified" to true', async () => {
    const { contract, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    await contract.setAccessPointNameVerify('accesspoint.com', true);

    const ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp.nameVerified).to.be.true;
  });

  it('should change "nameVerified" to false', async () => {
    const { contract, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
    const beforeParsedAp = JSON.parse(beforeAp);
    expect(beforeParsedAp.nameVerified).to.be.false;

    await contract.setAccessPointNameVerify('accesspoint.com', true);
    await contract.setAccessPointNameVerify('accesspoint.com', false);

    const ap = await contract.getAccessPointJSON('accesspoint.com');
    const parsedAp = JSON.parse(ap);

    expect(parsedAp.nameVerified).to.be.false;
  });

  it('should token owner be able to change the auto approval settings to on', async () => {
    const { contract, tokenId, owner } = fixture;

    await contract
      .connect(owner)
      .changeAccessPointAutoApprovalSettings(tokenId, true);

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
    const beforeParsedAp = JSON.parse(beforeAp);

    expect(beforeParsedAp.status).to.be.eql('1'); //APPROVED STATUS
  });

  it('should token owner be able to approve a draft ap', async () => {
    const { contract, tokenId, owner } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
    const beforeParsedAp = JSON.parse(beforeAp);
    expect(beforeParsedAp.status).to.be.eql('0'); //DRAFT STATUS

    await contract
      .connect(owner)
      .setApprovalForAccessPoint(tokenId, 'accesspoint.com', true);

    const afterAp = await contract.getAccessPointJSON('accesspoint.com');
    const afterParsedAp = JSON.parse(afterAp);
    expect(afterParsedAp.status).to.be.eql('1'); //APPROVED STATUS
  });

  it('should token owner be able to reject a draft ap', async () => {
    const { contract, tokenId, owner } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint.com');

    const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
    const beforeParsedAp = JSON.parse(beforeAp);
    expect(beforeParsedAp.status).to.be.eql('0'); //DRAFT STATUS

    await contract
      .connect(owner)
      .setApprovalForAccessPoint(tokenId, 'accesspoint.com', false);

    const afterAp = await contract.getAccessPointJSON('accesspoint.com');
    const afterParsedAp = JSON.parse(afterAp);

    expect(afterParsedAp.status).to.be.eql('2'); //REJECTED STATUS
  });
});
