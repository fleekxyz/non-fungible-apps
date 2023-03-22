import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers, upgrades } from 'hardhat';
import { TestConstants } from './constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const namehash = require('@ensdomains/eth-ens-namehash');

export const parseTokenURI = (tokenURI: string) => {
  const tokenURIDecoded = Buffer.from(
    tokenURI.replace('data:application/json;base64,', ''),
    'base64'
  ).toString('ascii');

  return JSON.parse(tokenURIDecoded);
};

export const getENSNode = (name: string) => {
  return namehash.hash(namehash.normalize(name));
};

export const transferENSNode = async (name: string, to: SignerWithAddress) => {
  const ens = await ethers.getContractAt(
    'ENS',
    '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
  );

  const ensNode = getENSNode(name);

  console.log('before', await ens.owner(ensNode));

  const ensOwner = await ethers.getImpersonatedSigner(await ens.owner(ensNode));

  await to.sendTransaction({
    to: ensOwner.address,
    value: ethers.utils.parseEther('1000'),
  });

  await ens.connect(ensOwner).setOwner(ensNode, to.address);

  console.log('after', await ens.owner(ensNode));
};
