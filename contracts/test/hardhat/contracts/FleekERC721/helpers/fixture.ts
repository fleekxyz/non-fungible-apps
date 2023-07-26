import { ethers, upgrades } from 'hardhat';
import { TestConstants } from './constants';
import { transferENSNode } from './utils';

export abstract class Fixtures {
  static async default() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    await transferENSNode(TestConstants.MintParams.ens, owner);

    const libraries = {
      FleekSVG: (await (await ethers.getContractFactory('FleekSVG')).deploy())
        .address,
    };

    const Contract = await ethers.getContractFactory('FleekERC721', {
      libraries,
    });

    const contract = await upgrades.deployProxy(
      Contract,
      [
        TestConstants.CollectionParams.name,
        TestConstants.CollectionParams.symbol,
        [], // Initial Billings
      ],
      {
        unsafeAllow: ['external-library-linking'],
      }
    );

    return { owner, otherAccount, contract };
  }

  static async withMint() {
    const fromDefault = await Fixtures.default();

    const response = await fromDefault.contract.mint(
      fromDefault.owner.address,
      TestConstants.MintParams.name,
      TestConstants.MintParams.description,
      TestConstants.MintParams.ens,
      TestConstants.MintParams.logo,
      TestConstants.MintParams.color,
      TestConstants.MintParams.category,
      TestConstants.MintParams.build,
      fromDefault.owner.address
    );

    const tokenId = response.value.toNumber();
    return { ...fromDefault, tokenId };
  }
}
