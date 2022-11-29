const { expect } = require('chai');
const { loadFixture } = require('ethereum-waffle');

describe('SitesNFTs contract', function () {
  const name = 'Sites NFTs';
  const symbol = 'SNFT';

  async function deploy() {
    const [owner, address1, address2] = await hre.ethers.getSigners();

    const SitesNFTs = await hre.ethers.getContractFactory('SitesNFTs');

    const hardhatSitesNFTs = await SitesNFTs.deploy(name, symbol);

    return { owner, address1, address2, hardhatSitesNFTs };
  }

  describe('Deployment', () => {
    it('Deployment should assign the name and the symbol of the ERC721 contract', async () => {
      const { hardhatSitesNFTs } = await loadFixture(deploy);

      const contractName = await hardhatSitesNFTs.name();
      const contractSymbol = await hardhatSitesNFTs.symbol();

      expect(contractName).to.equal(name);
      expect(contractSymbol).to.equal(symbol);
    });

    it('Deployment should assign the deployer DEFAULT_ADMIN_ROLE', async () => {
      const { hardhatSitesNFTs, owner } = await loadFixture(deploy);

      const DEFAULT_ADMIN_ROLE_STRING = '';

      const hasAdminRole = await hardhatSitesNFTs.hasRole(
        ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE_STRING),
        await owner.getAddress()
      );

      expect(hasAdminRole).to.equal(true);
    });

    it('Deployment should assign initial tokenId to 0', async () => {
      const { hardhatSitesNFTs } = await loadFixture(deploy);
      const currentTokenId = await hardhatSitesNFTs.getCurrentTokenId();

      expect(currentTokenId).to.equal(0);
    });
  });

  describe('Access control', () => {
    it('User with DEFAULT_ADMIN_ROLE should be able to assign MINTER_ROLE to another user', async () => {
      const { hardhatSitesNFTs, address1 } = await loadFixture(deploy);
      const MINTER_ROLE = 'MINTER_ROLE';

      await hardhatSitesNFTs.grantRole(
        ethers.utils.formatBytes32String(MINTER_ROLE),
        await address1.getAddress()
      );

      const hasMinterRole = await hardhatSitesNFTs.hasRole(
        ethers.utils.formatBytes32String(MINTER_ROLE),
        await address1.getAddress()
      );

      expect(hasMinterRole).to.equal(true);
    });

    it('User with DEFAULT_ADMIN_ROLE should be able to assign MINTER_ROLE to himself and still have DEFAULT_ADMIN_ROLE', async () => {
      const { hardhatSitesNFTs, owner } = await loadFixture(deploy);
      const MINTER_ROLE = 'MINTER_ROLE';
      const DEFAULT_ADMIN_ROLE = '';

      await hardhatSitesNFTs.grantRole(
        ethers.utils.formatBytes32String(MINTER_ROLE),
        await owner.getAddress()
      );

      const hasMinterRole = await hardhatSitesNFTs.hasRole(
        ethers.utils.formatBytes32String(MINTER_ROLE),
        await owner.getAddress()
      );
      const hasAdminRole = await hardhatSitesNFTs.hasRole(
        ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE),
        await owner.getAddress()
      );

      expect(hasMinterRole).to.equal(true);
      expect(hasAdminRole).to.equal(true);
    });

    it('User with DEFAULT_ADMIN_ROLE should be able to assign DEFAULT_ADMIN_ROLE to another user', async () => {
      const { hardhatSitesNFTs, address1 } = await loadFixture(deploy);
      const DEFAULT_ADMIN_ROLE = '';

      await hardhatSitesNFTs.grantRole(
        ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE),
        await address1.getAddress()
      );

      const hasAdminRole = await hardhatSitesNFTs.hasRole(
        ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE),
        await address1.getAddress()
      );

      expect(hasAdminRole).to.equal(true);
    });

    it('User with DEFAULT_ADMIN_ROLE should be able to assign DEFAULT_ADMIN_ROLE to another user and still have DEFAULT_ADMIN_ROLE', async () => {
      const { hardhatSitesNFTs, owner, address1 } = await loadFixture(deploy);
      const DEFAULT_ADMIN_ROLE = '';

      await hardhatSitesNFTs.grantRole(
        ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE),
        await address1.getAddress()
      );

      let hasAdminRole = await hardhatSitesNFTs.hasRole(
        ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE),
        await address1.getAddress()
      );

      expect(hasAdminRole).to.equal(true);

      hasAdminRole = await hardhatSitesNFTs.hasRole(
        ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE),
        await owner.getAddress()
      );

      expect(hasAdminRole).to.equal(true);
    });

    it('User without DEFAULT_ADMIN_ROLE shouldnt be able to assign DEFAULT_ADMIN_ROLE to another user', async () => {
      const [owner, address1, address2] = await ethers.getSigners();

      const SitesNFTs = await ethers.getContractFactory('SitesNFTs');

      const hardhatSitesNFTs = await SitesNFTs.deploy('Sites NFTs', 'SNFT');

      const DEFAULT_ADMIN_ROLE = '';

      try {
        await hardhatSitesNFTs
          .connect(address1)
          .grantRole(
            ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE),
            await address2.getAddress()
          );
      } catch (e) {}

      const hasAdminRole = await hardhatSitesNFTs.hasRole(
        ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE),
        await address2.getAddress()
      );

      expect(hasAdminRole).to.equal(false);
    });

    it('User without DEFAULT_ADMIN_ROLE shouldnt be able to assign MINTER_ROLE to another user', async () => {
      const [owner, address1, address2] = await ethers.getSigners();

      const SitesNFTs = await ethers.getContractFactory('SitesNFTs');

      const hardhatSitesNFTs = await SitesNFTs.deploy('Sites NFTs', 'SNFT');

      const MINTER_ROLE = 'MINTER_ROLE';

      try {
        await hardhatSitesNFTs
          .connect(address1)
          .grantRole(
            ethers.utils.formatBytes32String(MINTER_ROLE),
            await address2.getAddress()
          );
      } catch (e) {}

      const hasMinterRole = await hardhatSitesNFTs.hasRole(
        ethers.utils.formatBytes32String(MINTER_ROLE),
        await address2.getAddress()
      );

      expect(hasMinterRole).to.equal(false);
    });
  });

  describe('Minting', () => {
    it('User with DEFAULT_ADMIN_ROLE should be able to mint', async () => {
      const { hardhatSitesNFTs, address1 } = await loadFixture(deploy);
      const tokenURI = 'tokenURI';

      await hardhatSitesNFTs.mint(tokenURI, await address1.getAddress());

      const balance = await hardhatSitesNFTs.balanceOf(
        await address1.getAddress()
      );

      expect(balance).to.equal(1);
    });

    it('User with MINTER_ROLE should be able to mint', async () => {
      const { hardhatSitesNFTs, address1, address2 } = await loadFixture(
        deploy
      );
      const MINTER_ROLE = 'MINTER_ROLE';
      const tokenURI = 'tokenURI';

      await hardhatSitesNFTs.grantRole(
        ethers.utils.formatBytes32String(MINTER_ROLE),
        await address1.getAddress()
      );

      await hardhatSitesNFTs.hasRole(
        ethers.utils.formatBytes32String(MINTER_ROLE),
        await address1.getAddress()
      );

      await hardhatSitesNFTs
        .connect(address1)
        .mint(tokenURI, await address2.getAddress());

      const balance = await hardhatSitesNFTs.balanceOf(
        await address2.getAddress()
      );

      expect(balance).to.equal(1);
    });

    it('User without MINTER_ROLE or DEFAULT_ADMIN_ROLE shouldnt be able to mint', async () => {
      const [owner, address1, address2] = await ethers.getSigners();

      const SitesNFTs = await ethers.getContractFactory('SitesNFTs');

      const hardhatSitesNFTs = await SitesNFTs.deploy('Sites NFTs', 'SNFT');

      const tokenURI = 'tokenURI';

      try {
        await hardhatSitesNFTs
          .connect(address1)
          .mint(tokenURI, await address2.getAddress());
      } catch (e) {}

      const balance = await hardhatSitesNFTs.balanceOf(
        await address2.getAddress()
      );

      expect(balance).to.equal(0);
    });

    it('Minted NFT should have data:application/json;base64, baseURI', async () => {
      const { hardhatSitesNFTs, address1 } = await loadFixture(deploy);
      const tokenURI = 'tokenURI';

      await hardhatSitesNFTs.mint(tokenURI, await address1.getAddress());

      const mintedNFT = await hardhatSitesNFTs.tokenURI(0);

      expect(mintedNFT.includes('data:application/json;base64,')).to.equal(
        true
      );
    });
  });
});
