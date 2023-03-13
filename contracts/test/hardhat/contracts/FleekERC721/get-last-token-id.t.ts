import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import {
  TestConstants,
  Fixtures,
  Errors,
  OverloadedFunctions,
} from './helpers';

describe('FleekERC721.GetLastTokenId', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.default>>;

  const mint = async () => {
    const response = await fixture.contract[OverloadedFunctions.Mint.Default](
      fixture.owner.address,
      TestConstants.MintParams.name,
      TestConstants.MintParams.description,
      TestConstants.MintParams.externalUrl,
      TestConstants.MintParams.ens,
      TestConstants.MintParams.commitHash,
      TestConstants.MintParams.gitRepository,
      TestConstants.MintParams.logo,
      TestConstants.MintParams.color,
      false,
      fixture.owner.address
    );

    return response;
  };

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.default);
  });

  it('should revert if there is no token minted', async () => {
    const { contract } = fixture;
    await expect(contract.getLastTokenId()).to.be.revertedWithCustomError(
      contract,
      Errors.ThereIsNoTokenMinted
    );
  });

  it('should return the last token id', async () => {
    const { contract } = fixture;

    await mint();

    expect(await contract.getLastTokenId()).to.be.equal(0);
  });

  it('should return the last token id after minting multiple tokens', async () => {
    const { contract } = fixture;

    await mint();
    await mint();
    await mint();

    expect(await contract.getLastTokenId()).to.be.equal(2);
  });
});
