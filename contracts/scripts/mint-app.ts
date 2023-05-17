// npx hardhat run scripts/mint-app.ts --network local

import { ethers } from 'hardhat';

const mintApp = async (nfaId: number) => {
  const contract = await ethers.getContractAt(
    'FleekApps',
    '0x93c58464675a79cb623000C661Fc105795B80aA0'
  );

  await contract.mint('0x7ed735b7095c05d78df169f991f2b7f1a1f1a049', nfaId);

  console.log('Minted app');
};

mintApp(1);
