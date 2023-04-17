export const createBunnyCDNMock = async (
  domain: string,
  targetDomain: string
): Promise<{ record_type: 'CNAME' | 'ANAME'; host: string; cdn: string }> => {
  return new Promise((resolved, reject) => {
    setTimeout(() => {
      resolved({
        record_type: 'CNAME', //this comes from the API?
        host: 'app', //this comes from the API?
        cdn: '8c12c649402442d88b5f.b-cdn.net',
      });
    }, 3000);
  });
};
