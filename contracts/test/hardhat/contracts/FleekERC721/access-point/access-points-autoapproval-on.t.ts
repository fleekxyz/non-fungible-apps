import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { before } from 'mocha';
import { Fixtures } from '../helpers';

describe('AccessPoints with Auto Approval on', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.withMint>>;

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.withMint);
    const { contract, tokenId } = fixture;
    contract.changeAccessPointAutoApprovalSettings(tokenId, true);
  });

  it('should add an AP with draft status', async () => {
    const { contract, owner, tokenId } = fixture;

    await expect(contract.addAccessPoint(tokenId, 'accesspoint.com'))
      .to.emit(contract, 'NewAccessPoint')
      .withArgs('accesspoint.com', tokenId, owner.address);

    expect(await contract.appAccessPoints(tokenId)).eql(['accesspoint.com']);
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
      status: '1',
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
      status: '1',
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
      status: '1',
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

    expect(await contract.appAccessPoints(tokenId)).eql([]);
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

  it('should get a list of added APs for an app', async () => {
    const { contract, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint1.com');
    await contract.addAccessPoint(tokenId, 'accesspoint2.com');
    await contract.addAccessPoint(tokenId, 'accesspoint3.com');
    await contract.addAccessPoint(tokenId, 'accesspoint4.com');

    const aps = await contract.appAccessPoints(tokenId);

    expect(aps).to.eql([
      'accesspoint1.com',
      'accesspoint2.com',
      'accesspoint3.com',
      'accesspoint4.com',
    ]);
  });

  it('should get a list of added APs for an app after removing one', async () => {
    const { contract, tokenId } = fixture;

    await contract.addAccessPoint(tokenId, 'accesspoint1.com');
    await contract.addAccessPoint(tokenId, 'accesspoint2.com');
    await contract.addAccessPoint(tokenId, 'accesspoint3.com');
    await contract.addAccessPoint(tokenId, 'accesspoint4.com');

    await contract.removeAccessPoint('accesspoint2.com');

    const aps = await contract.appAccessPoints(tokenId);

    expect(aps).to.eql([
      'accesspoint1.com',
      'accesspoint4.com',
      'accesspoint3.com',
    ]);
  });
});
