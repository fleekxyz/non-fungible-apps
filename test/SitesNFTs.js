const { expect } = require("chai");

describe("SitesNFTs contract", function () {
    describe("Deployment", () => {
        it("Deployment should assign the name and the symbol of the ERC721 contract", async () => {
            const [owner] = await ethers.getSigners();
        
            const name = "Sites NFTs";
            const symbol = "SNFT";
        
            const SitesNFTs = await ethers.getContractFactory("SitesNFTs");
        
            const hardhatSitesNFTs = await SitesNFTs.deploy("Sites NFTs", "SNFT");
        
            const contractName = await hardhatSitesNFTs.name();
            const contractSymbol = await hardhatSitesNFTs.symbol();
        
            expect(contractName).to.equal(name);
            expect(contractSymbol).to.equal(symbol);
          });
        
          it("Deployment should assign the deployer DEFAULT_ADMIN_ROLE", async () => {
            const [owner] = await ethers.getSigners();
        
            const SitesNFTs = await ethers.getContractFactory("SitesNFTs");
        
            const hardhatSitesNFTs = await SitesNFTs.deploy("Sites NFTs", "SNFT");
        
            const DEFAULT_ADMIN_ROLE_STRING = ""
        
            const hasAdminRole = await hardhatSitesNFTs.hasRole(ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE_STRING) , await owner.getAddress());
        
            expect(hasAdminRole).to.equal(true);
          });
        
          it("Deployment should assign initial tokenId to 0", async () => {
            const [owner] = await ethers.getSigners();
        
            const SitesNFTs = await ethers.getContractFactory("SitesNFTs");
        
            const hardhatSitesNFTs = await SitesNFTs.deploy("Sites NFTs", "SNFT");
        
            const currentTokenId = await hardhatSitesNFTs.getCurrentTokenId();
        
            expect(currentTokenId).to.equal(0);
          });
    });

    describe("Access control", () => {
        it("User with DEFAULT_ADMIN_ROLE should be able to assign MINTER_ROLE to another user", async () => {
            const [owner, address1] = await ethers.getSigners();
        
            const SitesNFTs = await ethers.getContractFactory("SitesNFTs");
        
            const hardhatSitesNFTs = await SitesNFTs.deploy("Sites NFTs", "SNFT");
        
            const MINTER_ROLE = "MINTER_ROLE"

            await hardhatSitesNFTs.grantRole(ethers.utils.formatBytes32String(MINTER_ROLE), await address1.getAddress());

            const hasMinterRole = await hardhatSitesNFTs.hasRole(ethers.utils.formatBytes32String(MINTER_ROLE), await address1.getAddress());

            expect(hasMinterRole).to.equal(true);
          });

          it("User with DEFAULT_ADMIN_ROLE should be able to assign DEFAULT_ADMIN_ROLE to another user", async () => {
            const [owner, address1] = await ethers.getSigners();
        
            const SitesNFTs = await ethers.getContractFactory("SitesNFTs");
        
            const hardhatSitesNFTs = await SitesNFTs.deploy("Sites NFTs", "SNFT");
        
            const DEFAULT_ADMIN_ROLE = "";

            await hardhatSitesNFTs.grantRole(ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE), await address1.getAddress());

            const hasAdminRole = await hardhatSitesNFTs.hasRole(ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE), await address1.getAddress());

            expect(hasAdminRole).to.equal(true);
          });

          it("User without DEFAULT_ADMIN_ROLE shouldnt be able to assign DEFAULT_ADMIN_ROLE to another user", async () => {
            const [owner, address1, address2] = await ethers.getSigners();
        
            const SitesNFTs = await ethers.getContractFactory("SitesNFTs");
        
            const hardhatSitesNFTs = await SitesNFTs.deploy("Sites NFTs", "SNFT");
        
            const DEFAULT_ADMIN_ROLE = "";

            try {
                await hardhatSitesNFTs.connect(address1).grantRole(ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE), await address2.getAddress());
            } catch (e) {

            }

            const hasAdminRole = await hardhatSitesNFTs.hasRole(ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE), await address2.getAddress());

            expect(hasAdminRole).to.equal(false);
          });

          it("User without DEFAULT_ADMIN_ROLE shouldnt be able to assign MINTER_ROLE to another user", async () => {
            const [owner, address1, address2] = await ethers.getSigners();
        
            const SitesNFTs = await ethers.getContractFactory("SitesNFTs");
        
            const hardhatSitesNFTs = await SitesNFTs.deploy("Sites NFTs", "SNFT");
        
            const MINTER_ROLE = "MINTER_ROLE"

            try {
                await hardhatSitesNFTs.connect(address1).grantRole(ethers.utils.formatBytes32String(MINTER_ROLE), await address2.getAddress());
            } catch (e) {

            }

            const hasMinterRole = await hardhatSitesNFTs.hasRole(ethers.utils.formatBytes32String(MINTER_ROLE), await address2.getAddress());

            expect(hasMinterRole).to.equal(false);
          });
    });
});