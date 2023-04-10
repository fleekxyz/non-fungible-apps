import { expect } from 'chai';
import * as hre from 'hardhat';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import deploy from '../../../scripts/deploy';
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import { Contract } from 'ethers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { Errors, TestConstants } from '../contracts/FleekERC721/helpers';

const taskArgs = {
  newProxyInstance: false,
  name: 'FleekNFAs',
  symbol: 'FLKNFA',
  billing: [],
};

const getImplementationContract = async (
  proxyAddress: string
): Promise<Contract> => {
  const implementationAddress = await getImplementationAddress(
    hre.network.provider,
    proxyAddress
  );
  return hre.ethers.getContractAt('FleekERC721', implementationAddress);
};

const deployFixture = async () => {
  const [owner] = await hre.ethers.getSigners();

  const proxy = (await deploy(taskArgs, hre)) as Contract;

  const implementation = await getImplementationContract(proxy.address);

  return { proxy, implementation, owner };
};

describe('Deploy', () => {
  let fixture: Awaited<ReturnType<typeof deployFixture>>;

  // Suppress console.log
  const logger = console.log;
  before(() => {
    console.log = () => undefined;
  });
  after(() => {
    console.log = logger;
  });
  // --------------------

  beforeEach(async () => {
    fixture = await loadFixture(deployFixture);
  });

  it('should deploy the contract', async () => {
    const { proxy, implementation } = fixture;

    expect(proxy.address).to.be.a('string');
    expect(implementation.address).to.be.a('string');
    expect(proxy.address).to.be.not.equal(implementation.address);
  });

  it('should have proxy unpaused and implementation paused', async () => {
    const { proxy, implementation } = fixture;

    expect(await proxy.isPaused()).to.be.false;
    expect(await implementation.isPaused()).to.be.true;
  });

  it('should not allow initialize implementation contract', async () => {
    const { implementation } = fixture;

    await expect(
      implementation.initialize(
        taskArgs.name,
        taskArgs.symbol,
        taskArgs.billing
      )
    ).to.be.revertedWith('Initializable: contract is already initialized');
  });

  it('should have owner on proxy but not on implementation', async () => {
    const { proxy, implementation, owner } = fixture;

    expect(await proxy.hasCollectionRole(0, owner.address)).to.be.true;
    expect(await implementation.hasCollectionRole(0, owner.address)).to.be
      .false;
  });

  it('should not allow mint on implementation contract', async () => {
    const { implementation, owner } = fixture;

    await expect(
      implementation.mint(
        owner.address,
        TestConstants.MintParams.name,
        TestConstants.MintParams.description,
        TestConstants.MintParams.externalUrl,
        TestConstants.MintParams.ens,
        TestConstants.MintParams.commitHash,
        TestConstants.MintParams.gitRepository,
        TestConstants.MintParams.logo,
        TestConstants.MintParams.color,
        TestConstants.MintParams.accessPointAutoApprovalSettings,
        owner.address
      )
    ).to.be.revertedWithCustomError(implementation, Errors.ContractIsPaused);
  });
});
