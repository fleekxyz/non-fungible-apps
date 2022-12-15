import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import web3 from 'web3';

describe('FleekERC721', () => {
  const COLLECTION_OWNER_ROLE = web3.utils.keccak256('COLLECTION_OWNER_ROLE');

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

    it('should assign the owner of the contract', async () => {
      const { owner, contract } = await loadFixture(defaultFixture);

      expect(await contract.hasCollectionRole(0, owner.address)).to.equal(true);
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
      expect(await contract.hasTokenRole(tokenId, 0, owner.address)).to.be.true;

      expect(await contract.ownerOf(tokenId)).not.to.equal(
        otherAccount.address
      );
      expect(await contract.hasTokenRole(tokenId, 0, otherAccount.address)).to
        .be.false;
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
      const hasRole = await contract.hasTokenRole(tokenId, 0, owner.address);

      expect(hasRole).to.be.true;
    });

    it('should add a list of controllers', async () => {
      const { contract, owner } = fixture;
      await contract.grantTokenRole(
        tokenId,
        1,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
      );
      await contract.grantTokenRole(
        tokenId,
        1,
        '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3'
      );

      expect(await contract.getTokenRoleMembers(tokenId, 1)).to.eql([
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
        '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3',
      ]);
    });

    it('should not match the owner role for other account', async () => {
      const { contract, otherAccount } = fixture;
      const hasRole = await contract.hasTokenRole(
        tokenId,
        0,
        otherAccount.address
      );

      expect(hasRole).to.be.false;
    });

    it('should add a new controller', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.grantTokenRole(tokenId, 1, otherAccount.address);

      expect(await contract.hasTokenRole(tokenId, 1, otherAccount.address)).to
        .be.true;
    });

    it('should transfer the token owner role', async () => {
      // FIXME: this test is failing
      const { contract, owner, otherAccount } = fixture;
      await contract.transferFrom(owner.address, otherAccount.address, tokenId);

      console.log(owner.address, otherAccount.address, tokenId);

      console.log(await contract.getTokenRoleMembers(tokenId, 0));
      console.log(await contract.getTokenRoleMembers(tokenId, 1));

      expect(await contract.ownerOf(tokenId)).to.equal(otherAccount.address);
      expect(await contract.hasTokenRole(tokenId, 0, otherAccount.address)).to
        .be.true;
      expect(await contract.hasTokenRole(tokenId, 0, owner.address)).to.be
        .false;
    });
  });
});
