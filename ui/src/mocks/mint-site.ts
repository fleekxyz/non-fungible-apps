import { SiteNFT } from '@/types';

export const mintSiteNFT = async (props: SiteNFT) => {
  const { name, description, owner, image } = props;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'success', data: { name, description, owner, image } });
    }, 1000);
  });
};

