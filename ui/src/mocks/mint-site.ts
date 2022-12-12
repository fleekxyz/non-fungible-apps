import { SiteNFT } from '@/types';

export const mintSiteNFT = async (props: SiteNFT) => {
  const { name, description, owner, externalUrl, ens, commitHash, repo } =
    props;
  console.log('mintSiteNFT', props);
  return new Promise((resolved, rejected) => {
    setTimeout(() => {
      // returning data of the site for now
      // just leave rejected for testing purposes
      resolved({
        status: 'success',
        data: {
          name,
          description,
          owner,
          externalUrl,
          ens,
          commitHash,
          repo,
        },
      });
    }, 1000);
  });
};

