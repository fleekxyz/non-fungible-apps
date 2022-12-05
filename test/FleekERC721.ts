import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import web3 from 'web3';

describe('FleekERC721', () => {
  const COLLECTION_OWNER_ROLE = web3.utils.keccak256('COLLECTION_OWNER_ROLE');

  const MINT_PARAMS = {
    externalUrl: ethers.utils.hexZeroPad(
      web3.utils.fromAscii('https://fleek.co'),
      32
    ),
    ens: ethers.utils.hexZeroPad(web3.utils.fromAscii('fleek.eth'), 32),
    commitHash: 'commitHash',
    gitRepository: 'gitRepository',
  };

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
      const { externalUrl, ens, commitHash, gitRepository } = MINT_PARAMS;

      const response = await contract.mint(
        owner.address,
        externalUrl,
        ens,
        commitHash,
        gitRepository
      );

      expect(response.value).to.be.instanceOf(ethers.BigNumber);
      expect(response.value.toNumber()).to.equal(0);
    });

    it('should not be able to mint a new token if not the owner', async () => {
      const { otherAccount, contract } = await loadFixture(defaultFixture);
      const { externalUrl, ens, commitHash, gitRepository } = MINT_PARAMS;

      await expect(
        contract
          .connect(otherAccount)
          .mint(
            otherAccount.address,
            externalUrl,
            ens,
            commitHash,
            gitRepository
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
      const { externalUrl, ens, commitHash, gitRepository } = MINT_PARAMS;

      const response = await contract.mint(
        fixture.owner.address,
        externalUrl,
        ens,
        commitHash,
        gitRepository
      );

      tokenId = response.value.toNumber();
    });

    it('should return the token URI', async () => {
      const { contract } = fixture;
      const tokenURI = await contract.tokenURI(tokenId);
      expect(tokenURI).to.exist;
    });

    it('should match the token owner', async () => {
      const { contract, owner } = fixture;
      const tokenOwner = await contract.ownerOf(tokenId);
      expect(tokenOwner).to.equal(owner.address);
    });
  });
});
