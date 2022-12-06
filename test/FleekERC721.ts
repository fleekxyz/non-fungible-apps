import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import web3 from 'web3';

const stringToBytes32 = (str: string) => ethers.utils.formatBytes32String(str);
const bytes32ToString = (bytes32: string) =>
  ethers.utils.parseBytes32String(bytes32);

describe('FleekERC721', () => {
  const COLLECTION_OWNER_ROLE = web3.utils.keccak256('COLLECTION_OWNER_ROLE');

  const MINT_PARAMS = Object.freeze({
    name: 'Fleek Test App',
    description: 'Fleek Test App Description',
    image: stringToBytes32('https://fleek.co/image.png'),
    ens: stringToBytes32('fleek.eth'),
    externalUrl: stringToBytes32('https://fleek.co'),
    commitHash: 'commitHash',
    gitRepository: 'gitRepository',
    author: 'author',
  });

  const defaultFixture = async () => {
    const name = 'FleekERC721';
    const symbol = 'FLEEK';

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory('FleekERC721');
    const contract = await Contract.deploy(name, symbol);

    return { name, symbol, owner, otherAccount, contract };
  };

  describe('Deployment', () => {
    it('should assign the name and the symbol of the ERC721 contract', async () => {
      const { name, symbol, contract } = await loadFixture(defaultFixture);

      expect(await contract.name()).to.equal(name);
      expect(await contract.symbol()).to.equal(symbol);
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

      expect(parsedURI.name).to.equal(MINT_PARAMS.name);
      expect(parsedURI.description).to.equal(MINT_PARAMS.description);
      expect(parsedURI.image).to.equal(bytes32ToString(MINT_PARAMS.image));
      expect(parsedURI.external_url).to.equal(
        bytes32ToString(MINT_PARAMS.externalUrl)
      );
      expect(parsedURI.ENS).to.equal(bytes32ToString(MINT_PARAMS.ens));
      expect(parsedURI.attributes).to.be.eql([
        {
          trait_type: 'ENS',
          value: bytes32ToString(MINT_PARAMS.ens),
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
      ]);
    });

    it('should match the token owner', async () => {
      const { contract, owner } = fixture;
      const tokenOwner = await contract.ownerOf(tokenId);
      expect(tokenOwner).to.equal(owner.address);
    });
  });
});
