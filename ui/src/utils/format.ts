export const getRepoAndCommit = (url: string): object => {
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

export const getRepositoryFromURL = (url: string): string => {
  const urlSplitted = url.split('/');
  return urlSplitted[3] && urlSplitted[4]
    ? `${urlSplitted[3]}/${urlSplitted[4]}`
    : '';
};

export const getDate = (date: number): string => {
  return new Date(date * 1000).toLocaleDateString();
};

/**
 * @param date date in tiemstamp format
 * @returns time since date
 */
export const getTimeSince = (date: number): string => {
  const now = new Date().getTime(); //in timestamp format

  const milliseconds = now - date * 1000;
  const seconds = milliseconds / 1000;
  const minutes = Math.round((seconds / 60) % 60);
  const days = Math.round(seconds / (60 * 60 * 24));
  const hours = Math.round(minutes % 60);
  const months = Math.round(days / 30.5);
  const years = Math.round(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (minutes > 0) {
    return `${minutes} min ago`;
  }
  return `${Math.round(seconds)} sec ago}`;
};
