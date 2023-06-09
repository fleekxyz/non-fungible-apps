// npx hardhat run scripts/owner-of.ts --network local

import { getContract } from './util';

const ownerOf = async (tokenId: number) => {
  const contract = await getContract('FleekERC721');

  const owner = await contract.ownerOf(tokenId);

  console.log('Owner:', owner);
};

ownerOf(0);
