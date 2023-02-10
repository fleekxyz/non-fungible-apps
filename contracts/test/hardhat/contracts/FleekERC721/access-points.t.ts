import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { Fixtures } from './helpers';

describe('AccessPoints', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.withMint>>;
  const DefaultAP = 'accesspoint.com';

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.withMint);
    fixture.contract.addAccessPoint(fixture.tokenId, DefaultAP);
  });

  it('should add an AP', async () => {
    const { contract, owner, tokenId } = fixture;

    await expect(contract.addAccessPoint(tokenId, 'random.com'))
      .to.emit(contract, 'NewAccessPoint')
      .withArgs('random.com', tokenId, owner.address);

    expect(await contract.appAccessPoints(tokenId)).eql([
      DefaultAP,
      'random.com',
    ]);
  });

  it('should return a AP json object', async () => {
    const { contract, owner, tokenId } = fixture;

    const ap = await contract.getAccessPointJSON(DefaultAP);
    const parsedAp = JSON.parse(ap);

    expect(parsedAp).to.eql({
      tokenId,
      score: 0,
      owner: owner.address.toLowerCase(),
      contentVerified: false,
      nameVerified: false,
    });
  });

  it('should revert if AP does not exist', async () => {
    const { contract, tokenId } = fixture;

    await expect(contract.getAccessPointJSON('random.com')).to.be.revertedWith(
      'FleekERC721: invalid AP'
    );
  });

  it('should increase the AP score', async () => {
    const { contract, owner, tokenId } = fixture;

    await contract.increaseAccessPointScore(DefaultAP);

    const ap = await contract.getAccessPointJSON(DefaultAP);
    const parsedAp = JSON.parse(ap);

    expect(parsedAp).to.eql({
      tokenId,
      score: 1,
      owner: owner.address.toLowerCase(),
      contentVerified: false,
      nameVerified: false,
    });
  });

  it('should decrease the AP score', async () => {
    const { contract, owner, tokenId } = fixture;

    await contract.increaseAccessPointScore(DefaultAP);
    await contract.increaseAccessPointScore(DefaultAP);
    await contract.decreaseAccessPointScore(DefaultAP);

    const ap = await contract.getAccessPointJSON(DefaultAP);
    const parsedAp = JSON.parse(ap);

    expect(parsedAp).to.eql({
      tokenId,
      score: 1,
      owner: owner.address.toLowerCase(),
      contentVerified: false,
      nameVerified: false,
    });
  });

  it('should allow anyone to change AP score', async () => {
    const { contract, otherAccount, tokenId } = fixture;

    await contract.increaseAccessPointScore(DefaultAP);
    await contract.connect(otherAccount).increaseAccessPointScore(DefaultAP);
  });

  it('should remove an AP', async () => {
    const { contract, owner, tokenId } = fixture;

    await expect(contract.removeAccessPoint(DefaultAP))
      .to.emit(contract, 'RemoveAccessPoint')
      .withArgs(DefaultAP, tokenId, owner.address);

    expect(await contract.appAccessPoints(tokenId)).eql([]);
  });

  it('should allow only AP owner to remove it', async () => {
    const { contract, otherAccount } = fixture;

    await expect(
      contract.connect(otherAccount).removeAccessPoint(DefaultAP)
    ).to.be.revertedWith('FleekERC721: must be AP owner');
  });

  it('should not be allowed to add the same AP more than once', async () => {
    const { contract, tokenId } = fixture;

    await expect(
      contract.addAccessPoint(tokenId, DefaultAP)
    ).to.be.revertedWith('FleekERC721: AP already exists');
  });

  it('should change "contentVerified" to true', async () => {
    const { contract } = fixture;

    await contract.setAccessPointContentVerify(DefaultAP, true);

    const ap = await contract.getAccessPointJSON(DefaultAP);
    const parsedAp = JSON.parse(ap);

    expect(parsedAp.contentVerified).to.be.true;
  });

  it('should change "contentVerified" to false', async () => {
    const { contract } = fixture;

    const beforeAp = await contract.getAccessPointJSON(DefaultAP);
    const beforeParsedAp = JSON.parse(beforeAp);
    expect(beforeParsedAp.contentVerified).to.be.false;

    await contract.setAccessPointContentVerify(DefaultAP, true);
    await contract.setAccessPointContentVerify(DefaultAP, false);

    const ap = await contract.getAccessPointJSON(DefaultAP);
    const parsedAp = JSON.parse(ap);

    expect(parsedAp.contentVerified).to.be.false;
  });

  it('should change "nameVerified" to true', async () => {
    const { contract } = fixture;

    await contract.setAccessPointNameVerify(DefaultAP, true);

    const ap = await contract.getAccessPointJSON(DefaultAP);
    const parsedAp = JSON.parse(ap);

    expect(parsedAp.nameVerified).to.be.true;
  });

  it('should change "nameVerified" to false', async () => {
    const { contract } = fixture;

    const beforeAp = await contract.getAccessPointJSON(DefaultAP);
    const beforeParsedAp = JSON.parse(beforeAp);
    expect(beforeParsedAp.nameVerified).to.be.false;

    await contract.setAccessPointNameVerify(DefaultAP, true);
    await contract.setAccessPointNameVerify(DefaultAP, false);

    const ap = await contract.getAccessPointJSON(DefaultAP);
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
      DefaultAP,
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
      DefaultAP,
      'accesspoint1.com',
      'accesspoint4.com',
      'accesspoint3.com',
    ]);
  });
});
