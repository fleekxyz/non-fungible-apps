import { SiteNFT } from '@/types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const mintSiteNFT = async (props: SiteNFT) => {
  const { name, description, owner, externalUrl, ens, commitHash, repo } =
    props;
  return new Promise((resolved) => {
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
