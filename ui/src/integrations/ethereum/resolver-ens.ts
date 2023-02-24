// Setup: npm install alchemy-sdk
import { env } from '@/constants';
import { Alchemy, Network } from 'alchemy-sdk';

const config = {
  apiKey: env.alchemy.id,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

// const walletAddress = '0xbd6bbe64bf841b81fc5a6e2b760029e316f2783b'; // replace with wallet address
const ensContractAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';

export const getNfts = async (address: string) => {
  const nfts = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: [ensContractAddress],
  });

  return nfts.ownedNfts.map((nft) => nft.title);
};
