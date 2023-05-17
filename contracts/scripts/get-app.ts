// npx hardhat run scripts/get-app.ts --network local

import { ethers } from 'hardhat';

const getApp = async (tokenId: number) => {
  const contract = await ethers.getContractAt(
    'FleekApps',
    '0x93c58464675a79cb623000C661Fc105795B80aA0'
  );

  const app = await contract.tokenURI(tokenId);

  console.log('App:', app);
};

getApp(0);
