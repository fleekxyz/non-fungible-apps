import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures, parseTokenURI } from './helpers';

describe('FleekERC721.TokenURI', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.withMint>>;

  before(async () => {
    fixture = await loadFixture(Fixtures.withMint);
  });

  it('should return the token URI', async () => {
    const { contract, tokenId } = fixture;
    const tokenURI = await contract.tokenURI(tokenId);

    const parsedURI = parseTokenURI(tokenURI);

    expect(parsedURI).to.eql({
      owner: fixture.owner.address.toLowerCase(),
      name: TestConstants.MintParams.name,
      description: TestConstants.MintParams.description,
      image: TestConstants.ResultantImage.Default,
      external_url: TestConstants.MintParams.externalUrl,
      attributes: [
        {
          trait_type: 'ENS',
          value: TestConstants.MintParams.ens,
        },
        {
          trait_type: 'Commit Hash',
          value: TestConstants.MintParams.commitHash,
        },
        {
          trait_type: 'Repository',
          value: TestConstants.MintParams.gitRepository,
        },
        {
          trait_type: 'Version',
          value: '0',
        },
        {
          trait_type: 'Color',
          value: `#${TestConstants.MintParams.color.toString(16)}`,
        },
      ],
    });
  });
});
