const { expect } = require('chai');
const { loadFixture } = require('ethereum-waffle');
const hre = require('hardhat');

describe('FleekSite contract', function () {
  //TODO check values are setted right on the contract
  const _name = 'Fleek Site';
  const _description = 'Fleek Site Description';
  const _thumbnail = 'https://fleek.co';
  const _externalUrl = 'https://fleek.co';

  async function deploy() {
    const [owner] = await hre.ethers.getSigners();

    const FleekSite = await hre.ethers.getContractFactory('FleekSite');

    const hardhatFleekSite = await FleekSite.deploy(
      'Fleek Site',
      'Fleek Site Description',
      'https://fleek.co',
      'https://fleek.co'
    );

    return { owner, hardhatFleekSite };
  }
  describe('Deployment', () => {
    it('Deploy FleekSit contract with name Fleek Site and builds[] should be 0', async () => {
      const { hardhatFleekSite } = await loadFixture(deploy);

      const currentBuilds = await hardhatFleekSite.getBuilds();
      expect(currentBuilds.length).to.equal(0);
    });
  });
});
