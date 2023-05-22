// npx hardhat run scripts/get-app.ts --network local

import { getContract, parseDataURI } from './util';

const getApp = async (tokenId: number) => {
  const contract = await getContract('FleekApps');

  const transaction = await contract.tokenURI(tokenId);

  const parsed = parseDataURI(transaction);

  console.log('App:', parsed);
};

getApp(0);
