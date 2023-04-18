export const isSubdomain = (url: string): boolean => {
  debugger;
  const urlParts = url.split('.');

  return urlParts.length > 2;
};
