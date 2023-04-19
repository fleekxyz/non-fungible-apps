export const isSubdomain = (url: string): boolean => {
  const urlParts = url.split('.');

  return urlParts.length > 2;
};
