import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures, Events, transferENSNode } from './helpers';

const {
  Logos: { 1: Logo1 },
  Colors: { 1: Color1 },
} = TestConstants;

describe('FleekERC721.UpdateProperties', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.withMint>>;

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.withMint);
  });

  it('should emit event for external url change', async () => {
    const { contract, tokenId, owner } = fixture;

    await expect(contract.setTokenExternalURL(tokenId, 'https://app.com'))
      .to.emit(contract, Events.MetadataUpdate.string)
      .withArgs(tokenId, 'externalURL', 'https://app.com', owner.address);
  });

  it('should emit event for ens change', async () => {
    const { contract, tokenId, owner } = fixture;

    await transferENSNode('subdomain.app.eth', owner);

    await expect(contract.setTokenENS(tokenId, 'subdomain.app.eth'))
      .to.emit(contract, Events.MetadataUpdate.string)
      .withArgs(tokenId, 'ENS', 'subdomain.app.eth', owner.address);
  });

  it('should emit event for name change', async () => {
    const { contract, tokenId, owner } = fixture;

    await expect(contract.setTokenName(tokenId, 'App'))
      .to.emit(contract, Events.MetadataUpdate.string)
      .withArgs(tokenId, 'name', 'App', owner.address);
  });

  it('should emit event for description change', async () => {
    const { contract, tokenId, owner } = fixture;

    await expect(contract.setTokenDescription(tokenId, 'App Description'))
      .to.emit(contract, Events.MetadataUpdate.string)
      .withArgs(tokenId, 'description', 'App Description', owner.address);
  });

  it('should emit event for build change', async () => {
    const { contract, tokenId, owner } = fixture;

    await expect(
      contract.setTokenBuild(
        tokenId,
        'commitHash',
        'gitRepository',
        'ipfsHash',
        'domain'
      )
    )
      .to.emit(contract, Events.MetadataUpdate.stringArray4)
      .withArgs(
        tokenId,
        'build',
        ['commitHash', 'gitRepository', 'ipfsHash', 'domain'],
        owner.address
      );
  });

  it('should update token logo', async () => {
    const { contract, tokenId } = fixture;
    await contract.setTokenLogo(tokenId, Logo1);

    const tokenURI = await contract.tokenURI(tokenId);

    const tokenURIDecoded = Buffer.from(
      tokenURI.replace('data:application/json;base64,', ''),
      'base64'
    ).toString('ascii');

    const parsedURI = JSON.parse(tokenURIDecoded);
    expect(parsedURI).to.have.property(
      'image',
      TestConstants.ResultantImage['Logo1+Default']
    );
  });

  it('should emit metadata updated event for logo change', async () => {
    const { contract, tokenId, owner } = fixture;

    await expect(contract.setTokenLogo(tokenId, Logo1))
      .to.emit(contract, Events.MetadataUpdate.string)
      .withArgs(tokenId, 'logo', Logo1, owner.address);
  });

  it('should update token color', async () => {
    const { contract, tokenId } = fixture;
    await contract.setTokenColor(tokenId, Color1);

    const tokenURI = await contract.tokenURI(tokenId);

    const tokenURIDecoded = Buffer.from(
      tokenURI.replace('data:application/json;base64,', ''),
      'base64'
    ).toString('ascii');

    const parsedURI = JSON.parse(tokenURIDecoded);

    expect(parsedURI.attributes).to.have.deep.contain({
      trait_type: 'Color',
      value: '#123456',
    });
    expect(parsedURI).to.have.property(
      'image',
      TestConstants.ResultantImage['Default+Color1']
    );
  });

  it('should emit metadata updated event for color change', async () => {
    const { contract, tokenId, owner } = fixture;

    await expect(contract.setTokenColor(tokenId, Color1))
      .to.emit(contract, Events.MetadataUpdate.uint24)
      .withArgs(tokenId, 'color', 0x123456, owner.address);
  });

  it('should update the token logo and color', async () => {
    const { contract, tokenId } = fixture;
    await contract.setTokenLogoAndColor(tokenId, Logo1, Color1);

    const tokenURI = await contract.tokenURI(tokenId);

    const tokenURIDecoded = Buffer.from(
      tokenURI.replace('data:application/json;base64,', ''),
      'base64'
    ).toString('ascii');

    const parsedURI = JSON.parse(tokenURIDecoded);

    expect(parsedURI.attributes).to.have.deep.contain({
      trait_type: 'Color',
      value: '#123456',
    });

    expect(parsedURI).to.have.property(
      'image',
      TestConstants.ResultantImage['Logo1+Color1']
    );
  });

  it('should emit metadata updated event for logo and color change', async () => {
    const { contract, tokenId, owner } = fixture;

    await expect(contract.setTokenLogoAndColor(tokenId, Logo1, Color1))
      .to.emit(contract, Events.MetadataUpdate.string)
      .withArgs(tokenId, 'logo', Logo1, owner.address)
      .and.to.emit(contract, Events.MetadataUpdate.uint24)
      .withArgs(tokenId, 'color', 0x123456, owner.address);
  });
});
