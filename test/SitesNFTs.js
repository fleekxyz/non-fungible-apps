const { expect } = require("chai");

describe("SitesNFTs contract", function () {
    describe("Deployment", () => {
        it("Deployment should assign the name and the symbol of the ERC721 contract", async function () {
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
        
          it("Deployment should assign the deployer DEFAULT_ADMIN_ROLE", async function () {
            const [owner] = await ethers.getSigners();
        
            const SitesNFTs = await ethers.getContractFactory("SitesNFTs");
        
            const hardhatSitesNFTs = await SitesNFTs.deploy("Sites NFTs", "SNFT");
        
            const DEFAULT_ADMIN_ROLE_STRING = ""
        
            const userRole = await hardhatSitesNFTs.hasRole(ethers.utils.formatBytes32String(DEFAULT_ADMIN_ROLE_STRING) , await owner.getAddress());
        
            expect(userRole).to.equal(true);
          });
        
          it("Deployment should assign initial tokenId to 0", async function () {
            const [owner] = await ethers.getSigners();
        
            const SitesNFTs = await ethers.getContractFactory("SitesNFTs");
        
            const hardhatSitesNFTs = await SitesNFTs.deploy("Sites NFTs", "SNFT");
        
            const currentTokenId = await hardhatSitesNFTs.getCurrentTokenId();
        
            expect(currentTokenId).to.equal(0);
          });
    });

    describe("Role management", () => {
        it("User with admin role should be able to assign MINTER_ROLE to another user", async function () {
            const [owner, address1] = await ethers.getSigners();
        
            const SitesNFTs = await ethers.getContractFactory("SitesNFTs");
        
            const hardhatSitesNFTs = await SitesNFTs.deploy("Sites NFTs", "SNFT");
        
            const currentTokenId = await hardhatSitesNFTs.getCurrentTokenId();
        
            expect(currentTokenId).to.equal(0);
          });
    });
});