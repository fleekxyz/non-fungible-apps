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

      expect(
        await contract.hasRole(COLLECTION_OWNER_ROLE, owner.address)
      ).to.equal(true);
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
        MINT_PARAMS.gitRepository
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
            MINT_PARAMS.gitRepository
          )
      ).to.be.revertedWith(
        'FleekAccessControl: must have collection owner role'
      );
    });
  });

  describe('Token', () => {
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
        MINT_PARAMS.gitRepository
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

    it('should match the token owner', async () => {
      const { contract, owner } = fixture;
      const tokenOwner = await contract.ownerOf(tokenId);
      expect(tokenOwner).to.equal(owner.address);
    });
  });
});
