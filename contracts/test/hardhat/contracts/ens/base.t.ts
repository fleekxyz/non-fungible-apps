import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const namehash = require('@ensdomains/eth-ens-namehash');

const getNode = (name: string) => {
  return namehash.hash(namehash.normalize(name));
};

const getHash = (name: string) => {
  return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
};

const baseFixture = async () => {
  // Contracts are deployed using the first signer/account by default
  const [owner, otherAccount] = await ethers.getSigners();

  const contract = await (await ethers.getContractFactory('FleekENS')).deploy();
  const ens = await ethers.getContractAt(
    'ENS',
    '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
  );

  return { owner, otherAccount, contract, ens };
};

describe.only('FleekENS', () => {
  let fixture: Awaited<ReturnType<typeof baseFixture>>;

  beforeEach(async () => {
    fixture = await loadFixture(baseFixture);
  });

  it('should resolve a name', async () => {
    const { contract, otherAccount, ens } = fixture;
    const node = getNode('zoruka.eth');

    const ensOwner = await ethers.getImpersonatedSigner(await ens.owner(node));

    console.log('ens node owner:', ensOwner.address);

    await otherAccount.sendTransaction({
      to: ensOwner.address,
      value: ethers.utils.parseEther('1000'),
    });

    // await contract
    //   .connect(ensOwner)
    //   .setENSPermission(node, otherAccount.address);

    console.log(getHash('nfa'));
    console.log(await contract.FLEEK_NFA_SUBDOMAIN());

    await ens
      .connect(ensOwner)
      .setSubnodeOwner(node, getHash('nfa'), otherAccount.address);

    const metadata = await contract
      .connect(otherAccount)
      .checkENSPermission(node);

    console.log(metadata);
  });
});
