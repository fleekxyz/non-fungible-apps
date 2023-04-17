import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { TestConstants, Fixtures } from './helpers';
import { ethers } from 'hardhat';
const { MintParams } = TestConstants;

describe('FleekERC721.GetToken', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.withMint>>;

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.withMint);
  });

  it('should return the token metadata without nested mappings', async () => {
    const { contract, tokenId } = fixture;
    const metadata = await contract.getToken(tokenId);

    expect(metadata).to.eql([
      MintParams.name,
      MintParams.description,
      MintParams.externalUrl,
      MintParams.ens,
      ethers.BigNumber.from(0),
      MintParams.logo,
      MintParams.color,
    ]);
  });
});
