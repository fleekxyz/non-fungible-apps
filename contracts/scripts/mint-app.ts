// npx hardhat run scripts/mint-app.ts --network local

import { getContract } from './util';

const mintApp = async (nfaId: number) => {
  const contract = await getContract('FleekApps');

  const transaction = await contract.mint(
    '0x7ed735b7095c05d78df169f991f2b7f1a1f1a049',
    nfaId
  );

  console.log('Minted app', transaction.hash);
};

mintApp(0);
