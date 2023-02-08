import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures } from './helpers';

const {
  Logos: { 1: Logo1 },
  Colors: { 1: Color1 },
} = TestConstants;

describe('FleekERC721.UpdateProperties', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.withMint>>;

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.withMint);
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
});
