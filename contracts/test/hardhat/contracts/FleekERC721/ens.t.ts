import { expect } from 'chai';
import { TestConstants, Fixtures, Errors, transferENSNode } from './helpers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
const { MintParams } = TestConstants;

describe('FleekERC721.ENS', () => {
  let fixture: Awaited<ReturnType<typeof Fixtures.default>>;

  beforeEach(async () => {
    fixture = await loadFixture(Fixtures.default);
  });

  it('should not allow mint if not ENS owner', async () => {
    const { contract, owner } = fixture;

    await expect(
      contract.mint(
        owner.address,
        MintParams.name,
        MintParams.description,
        'app.eth',
        MintParams.logo,
        MintParams.color,
        TestConstants.MintParams.category,
        TestConstants.MintParams.build,
        owner.address
      )
    ).to.be.revertedWithCustomError(contract, Errors.MustBeENSOwner);
  });

  it('should not allow set ENS if not ENS owner', async () => {
    const { contract, owner } = fixture;

    await transferENSNode('app.eth', owner);

    await contract.mint(
      owner.address,
      MintParams.name,
      MintParams.description,
      'app.eth',
      MintParams.logo,
      MintParams.color,
      TestConstants.MintParams.category,
      TestConstants.MintParams.build,
      owner.address
    );

    await expect(
      contract.setTokenENS(0, 'subdomain.app.eth')
    ).to.be.revertedWithCustomError(contract, Errors.MustBeENSOwner);
  });
});
