export const parseTokenURI = (tokenURI: string) => {
  const tokenURIDecoded = Buffer.from(
    tokenURI.replace('data:application/json;base64,', ''),
    'base64'
  ).toString('ascii');

  return JSON.parse(tokenURIDecoded);
};
