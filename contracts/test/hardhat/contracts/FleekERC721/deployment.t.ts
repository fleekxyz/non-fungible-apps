import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures } from './helpers';

describe('FleekERC721.Deployment', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.default>>;

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.default);
  });

  it('should assign the name and the symbol of the ERC721 contract', async () => {
    const { contract } = fixture;

    expect(await contract.name()).to.equal(TestConstants.CollectionParams.name);
    expect(await contract.symbol()).to.equal(
      TestConstants.CollectionParams.symbol
    );
  });

  it('should support ERC721 interface', async () => {
    const { contract } = fixture;

    expect(await contract.supportsInterface('0x80ac58cd')).to.equal(true);
  });
});
