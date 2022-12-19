import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('FleekERC721', () => {
  const ROLES = Object.freeze({
    OWNER: 0,
    CONTROLLER: 1,
  });

  const MINT_PARAMS = Object.freeze({
    name: 'Fleek Test App',
    description: 'Fleek Test App Description',
    image: 'https://fleek.co/image.png',
    ens: 'fleek.eth',
    externalUrl: 'https://fleek.co',
    commitHash: 'b72e47171746b6a9e29b801af9cb655ecf4d665c',
    gitRepository: 'https://github.com/fleekxyz/contracts',
    author: 'author',
  });

  const COLLECTION_PARAMS = Object.freeze({
    name: 'FleekERC721',
    symbol: 'FLEEK',
  });

  const defaultFixture = async () => {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory('FleekERC721');
    const contract = await Contract.deploy(
      COLLECTION_PARAMS.name,
      COLLECTION_PARAMS.symbol
    );

    return { owner, otherAccount, contract };
  };

  describe('Deployment', () => {
    it('should assign the name and the symbol of the ERC721 contract', async () => {
      const { contract } = await loadFixture(defaultFixture);

      expect(await contract.name()).to.equal(COLLECTION_PARAMS.name);
      expect(await contract.symbol()).to.equal(COLLECTION_PARAMS.symbol);
    });

    it('should support ERC721 interface', async () => {
      const { contract } = await loadFixture(defaultFixture);

      expect(await contract.supportsInterface('0x80ac58cd')).to.equal(true);
    });
  });

  describe('Minting', () => {
    it('should be able to mint a new token', async () => {
      const { owner, contract } = await loadFixture(defaultFixture);

      const response = await contract.mint(
        owner.address,
        MINT_PARAMS.name,
        MINT_PARAMS.description,
        MINT_PARAMS.image,
        MINT_PARAMS.externalUrl,
        MINT_PARAMS.ens,
        MINT_PARAMS.commitHash,
        MINT_PARAMS.gitRepository,
        MINT_PARAMS.author
      );

      expect(response.value).to.be.instanceOf(ethers.BigNumber);
      expect(response.value.toNumber()).to.equal(0);
    });

    it('should not be able to mint a new token if not the owner', async () => {
      const { otherAccount, contract } = await loadFixture(defaultFixture);

      await expect(
        contract
          .connect(otherAccount)
          .mint(
            otherAccount.address,
            MINT_PARAMS.name,
            MINT_PARAMS.description,
            MINT_PARAMS.image,
            MINT_PARAMS.externalUrl,
            MINT_PARAMS.ens,
            MINT_PARAMS.commitHash,
            MINT_PARAMS.gitRepository,
            MINT_PARAMS.author
          )
      ).to.be.revertedWith('FleekAccessControl: must have collection role');
    });

    it('should have address to as owner', async () => {
      const { owner, otherAccount, contract } = await loadFixture(
        defaultFixture
      );

      const response = await contract.mint(
        owner.address,
        MINT_PARAMS.name,
        MINT_PARAMS.description,
        MINT_PARAMS.image,
        MINT_PARAMS.externalUrl,
        MINT_PARAMS.ens,
        MINT_PARAMS.commitHash,
        MINT_PARAMS.gitRepository,
        MINT_PARAMS.author
      );

      const tokenId = response.value.toNumber();

      expect(await contract.ownerOf(tokenId)).to.equal(owner.address);
      expect(await contract.hasTokenRole(tokenId, ROLES.OWNER, owner.address))
        .to.be.true;

      expect(await contract.ownerOf(tokenId)).not.to.equal(
        otherAccount.address
      );
      expect(
        await contract.hasTokenRole(tokenId, ROLES.OWNER, otherAccount.address)
      ).to.be.false;
    });
  });

  describe('Token URI', () => {
    let tokenId: number;
    let fixture: Awaited<ReturnType<typeof defaultFixture>>;

    before(async () => {
      fixture = await loadFixture(defaultFixture);
      const { contract } = fixture;

      const response = await contract.mint(
        fixture.owner.address,
        MINT_PARAMS.name,
        MINT_PARAMS.description,
        MINT_PARAMS.image,
        MINT_PARAMS.externalUrl,
        MINT_PARAMS.ens,
        MINT_PARAMS.commitHash,
        MINT_PARAMS.gitRepository,
        MINT_PARAMS.author
      );

      tokenId = response.value.toNumber();
    });

    it('should return the token URI', async () => {
      const { contract } = fixture;
      const tokenURI = await contract.tokenURI(tokenId);

      const tokenURIDecoded = Buffer.from(
        tokenURI.replace('data:application/json;base64,', ''),
        'base64'
      ).toString('ascii');

      const parsedURI = JSON.parse(tokenURIDecoded);

      expect(parsedURI).to.eql({
        owner: fixture.owner.address.toLowerCase(),
        name: MINT_PARAMS.name,
        description: MINT_PARAMS.description,
        image: MINT_PARAMS.image,
        external_url: MINT_PARAMS.externalUrl,
        attributes: [
          {
            trait_type: 'ENS',
            value: MINT_PARAMS.ens,
          },
          {
            trait_type: 'Commit Hash',
            value: MINT_PARAMS.commitHash,
          },
          {
            trait_type: 'Repository',
            value: MINT_PARAMS.gitRepository,
          },
          {
            trait_type: 'Author',
            value: MINT_PARAMS.author,
          },
          {
            trait_type: 'Version',
            value: '0',
          },
        ],
      });
    });
  });

  describe('Token Roles', () => {
    let tokenId: number;
    let fixture: Awaited<ReturnType<typeof defaultFixture>>;

    beforeEach(async () => {
      fixture = await loadFixture(defaultFixture);
      const { contract } = fixture;

      const response = await contract.mint(
        fixture.owner.address,
        MINT_PARAMS.name,
        MINT_PARAMS.description,
        MINT_PARAMS.image,
        MINT_PARAMS.externalUrl,
        MINT_PARAMS.ens,
        MINT_PARAMS.commitHash,
        MINT_PARAMS.gitRepository,
        MINT_PARAMS.author
      );

      tokenId = response.value.toNumber();
    });

    it('should match the token owner', async () => {
      const { contract, owner } = fixture;
      const tokenOwner = await contract.ownerOf(tokenId);

      expect(tokenOwner).to.equal(owner.address);
    });

    it('should match the owner role for minter', async () => {
      const { contract, owner } = fixture;
      const hasRole = await contract.hasTokenRole(
        tokenId,
        ROLES.OWNER,
        owner.address
      );

      expect(hasRole).to.be.true;
    });

    it('should add a new controller', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        otherAccount.address
      );

      expect(
        await contract.hasTokenRole(
          tokenId,
          ROLES.CONTROLLER,
          otherAccount.address
        )
      ).to.be.true;
    });

    it('should add a list of controllers', async () => {
      const { contract } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
      );
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3'
      );

      expect(
        await contract.getTokenRoleMembers(tokenId, ROLES.CONTROLLER)
      ).to.eql([
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
        '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3',
      ]);
    });

    it('should add a list of owners', async () => {
      const { contract, owner } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.OWNER,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
      );
      await contract.grantTokenRole(
        tokenId,
        ROLES.OWNER,
        '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3'
      );

      expect(await contract.getTokenRoleMembers(tokenId, ROLES.OWNER)).to.eql([
        owner.address,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
        '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3',
      ]);
    });

    it('should not match the owner role for other account', async () => {
      const { contract, otherAccount } = fixture;
      const hasRole = await contract.hasTokenRole(
        tokenId,
        ROLES.OWNER,
        otherAccount.address
      );

      expect(hasRole).to.be.false;
    });

    it('should remove an added controller', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        otherAccount.address
      );
      await contract.revokeTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        otherAccount.address
      );

      expect(
        await contract.hasTokenRole(
          tokenId,
          ROLES.CONTROLLER,
          otherAccount.address
        )
      ).to.be.false;
    });

    it('should transfer the token owner role', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.transferFrom(owner.address, otherAccount.address, tokenId);

      expect(await contract.ownerOf(tokenId)).to.equal(otherAccount.address);
      expect(
        await contract.hasTokenRole(tokenId, ROLES.OWNER, otherAccount.address)
      ).to.be.true;
      expect(await contract.hasTokenRole(tokenId, ROLES.OWNER, owner.address))
        .to.be.false;
    });

    it('should clean the token controller list after transfer', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        otherAccount.address
      );
      await contract.transferFrom(owner.address, otherAccount.address, tokenId);

      expect(await contract.getTokenRoleMembers(tokenId, 1)).to.eql([]);
    });

    it('should not be able to add address role', async () => {
      const { contract, owner, otherAccount } = fixture;
      await expect(
        contract
          .connect(otherAccount)
          .grantTokenRole(tokenId, ROLES.OWNER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have token role');

      await expect(
        contract
          .connect(otherAccount)
          .grantTokenRole(tokenId, ROLES.CONTROLLER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have token role');
    });

    it('should not be able to remove address role', async () => {
      const { contract, owner, otherAccount } = fixture;
      await expect(
        contract
          .connect(otherAccount)
          .revokeTokenRole(tokenId, ROLES.OWNER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have token role');

      await expect(
        contract
          .connect(otherAccount)
          .revokeTokenRole(tokenId, ROLES.CONTROLLER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have token role');
    });

    it('should be able to add token role after owner role granted', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.grantTokenRole(tokenId, ROLES.OWNER, otherAccount.address);

      expect(
        await contract
          .connect(otherAccount)
          .grantTokenRole(tokenId, ROLES.CONTROLLER, otherAccount.address)
      ).to.not.be.reverted;
    });

    it('should emit event when token role is granted', async () => {
      const { contract, owner, otherAccount } = fixture;
      await expect(
        contract.grantTokenRole(tokenId, ROLES.CONTROLLER, otherAccount.address)
      )
        .to.emit(contract, 'TokenRoleGranted')
        .withArgs(
          tokenId,
          ROLES.CONTROLLER,
          otherAccount.address,
          owner.address
        );
    });

    it('should emit event when token role is revoked', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        otherAccount.address
      );
      await expect(
        contract.revokeTokenRole(
          tokenId,
          ROLES.CONTROLLER,
          otherAccount.address
        )
      )
        .to.emit(contract, 'TokenRoleRevoked')
        .withArgs(
          tokenId,
          ROLES.CONTROLLER,
          otherAccount.address,
          owner.address
        );
    });
  });

  describe('Collection Roles', () => {
    let fixture: Awaited<ReturnType<typeof defaultFixture>>;

    beforeEach(async () => {
      fixture = await loadFixture(defaultFixture);
    });

    it('should assign the owner of the contract on contract creation', async () => {
      const { owner, contract } = fixture;

      expect(await contract.hasCollectionRole(ROLES.OWNER, owner.address)).to.be
        .true;
    });

    it('should assign owner role to address', async () => {
      const { otherAccount, contract } = fixture;

      await contract.grantCollectionRole(ROLES.OWNER, otherAccount.address);

      expect(
        await contract.hasCollectionRole(ROLES.OWNER, otherAccount.address)
      ).to.be.true;
    });

    it('should assign controller role to address', async () => {
      const { owner, contract } = fixture;

      await contract.grantCollectionRole(ROLES.CONTROLLER, owner.address);

      expect(await contract.hasCollectionRole(ROLES.CONTROLLER, owner.address))
        .to.be.true;
    });

    it('should remove an assigned controller', async () => {
      const { otherAccount, contract } = fixture;

      await contract.grantCollectionRole(ROLES.OWNER, otherAccount.address);
      await contract.revokeCollectionRole(ROLES.OWNER, otherAccount.address);

      expect(
        await contract.hasCollectionRole(ROLES.OWNER, otherAccount.address)
      ).to.be.false;
    });

    it('should remove an assigned controller', async () => {
      const { owner, contract } = fixture;

      await contract.grantCollectionRole(ROLES.CONTROLLER, owner.address);
      await contract.revokeCollectionRole(ROLES.CONTROLLER, owner.address);

      expect(await contract.hasCollectionRole(ROLES.CONTROLLER, owner.address))
        .to.be.false;
    });

    it('should fetch the list of controllers', async () => {
      const { owner, contract } = fixture;

      await contract.grantCollectionRole(ROLES.CONTROLLER, owner.address);
      await contract.grantCollectionRole(
        ROLES.CONTROLLER,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
      );

      expect(await contract.getCollectionRoleMembers(ROLES.CONTROLLER)).to.eql([
        owner.address,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
      ]);
    });

    it('should fetch the list of owners', async () => {
      const { owner, contract, otherAccount } = fixture;

      await contract.grantCollectionRole(ROLES.OWNER, otherAccount.address);
      await contract.grantCollectionRole(
        ROLES.OWNER,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
      );

      expect(await contract.getCollectionRoleMembers(ROLES.OWNER)).to.eql([
        owner.address,
        otherAccount.address,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
      ]);
    });

    it('should not be able to add new owner', async () => {
      const { otherAccount, contract } = fixture;

      await expect(
        contract
          .connect(otherAccount)
          .grantCollectionRole(ROLES.OWNER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have collection role');
    });

    it('should not be able to add new controller', async () => {
      const { otherAccount, contract } = fixture;

      await expect(
        contract
          .connect(otherAccount)
          .grantCollectionRole(ROLES.CONTROLLER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have collection role');
    });

    it('should be able to add roles after owner being granted', async () => {
      const { otherAccount, contract } = fixture;

      await contract.grantCollectionRole(ROLES.OWNER, otherAccount.address);

      await expect(
        contract
          .connect(otherAccount)
          .grantCollectionRole(ROLES.CONTROLLER, otherAccount.address)
      ).to.not.be.reverted;
      await expect(
        contract
          .connect(otherAccount)
          .revokeCollectionRole(ROLES.CONTROLLER, otherAccount.address)
      ).to.not.be.reverted;
    });

    it('should not be able to change roles for controllers', async () => {
      const { owner, otherAccount, contract } = fixture;

      await contract.grantCollectionRole(
        ROLES.CONTROLLER,
        otherAccount.address
      );

      await expect(
        contract
          .connect(otherAccount)
          .grantCollectionRole(ROLES.OWNER, owner.address)
      ).to.be.revertedWith('FleekAccessControl: must have collection role');
      await expect(
        contract
          .connect(otherAccount)
          .revokeCollectionRole(ROLES.OWNER, owner.address)
      ).to.be.revertedWith('FleekAccessControl: must have collection role');
    });

    it('should emit event when role is granted', async () => {
      const { owner, contract, otherAccount } = fixture;

      await expect(
        contract.grantCollectionRole(ROLES.CONTROLLER, otherAccount.address)
      )
        .to.emit(contract, 'CollectionRoleGranted')
        .withArgs(ROLES.CONTROLLER, otherAccount.address, owner.address);
    });

    it('should emit event when role is revoked', async () => {
      const { owner, contract, otherAccount } = fixture;

      await contract.grantCollectionRole(
        ROLES.CONTROLLER,
        otherAccount.address
      );

      await expect(
        contract.revokeCollectionRole(ROLES.CONTROLLER, otherAccount.address)
      )
        .to.emit(contract, 'CollectionRoleRevoked')
        .withArgs(ROLES.CONTROLLER, otherAccount.address, owner.address);
    });
  });
});
