/* eslint-disable @typescript-eslint/no-unused-vars */
export const createBunnyCDNMock = async (
  domain: string,
  targetDomain: string
): Promise<{ bunnyURL: string }> => {
  return new Promise((resolved, reject) => {
    setTimeout(() => {
      resolved({
        bunnyURL: '8c12c649402442d88b5f.b-cdn.net',
      });
    }, 3000);
  });
};

export const verifyBunnyCDNMock = async (domain: string): Promise<boolean> => {
  return new Promise((resolved, reject) => {
    setTimeout(() => {
      resolved(true);
    }, 3000);
  });
};
