import { Ethereum } from '@/integrations';
import { store } from '@/store';
import { SiteNFT } from '@/types';

export const mintSiteNFT = async (props: SiteNFT) => {
  const {
    name,
    description,
    owner,
    externalUrl,
    ens,
    commitHash,
    repo,
    image,
  } = props;
  console.log('mintSiteNFT', props);

  try {
    const provider = store.getState().wallet.provider;
    if (!provider) throw new Error('Wallet not connected');
    const contract = await Ethereum.getContract('FleekERC721', provider);

    const response = await contract.mint(
      owner,
      name,
      description,
      image,
      externalUrl,
      ens,
      commitHash,
      repo,
      'author'
    );

    console.log('mint response', response);
    return response;
  } catch (e) {
    console.error('mint error', e);
    throw e;
  }
};

