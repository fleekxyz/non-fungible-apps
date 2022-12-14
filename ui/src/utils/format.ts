export const getRepoAndCommit = (url: string) => {
  //TODO validate is a github url
  url = url.replace('/commit', '');
  const lastIndexSlash = url.lastIndexOf('/');
  const repo = url.substring(0, lastIndexSlash + 1).slice(0, lastIndexSlash);
  const commit_hash = url.substring(lastIndexSlash + 1, url.length);
  return { repo, commit_hash };
};

export const contractAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
