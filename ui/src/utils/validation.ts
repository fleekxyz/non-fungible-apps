export const isValidUrl = (url: string): boolean => {
  const regex =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return regex.test(url);
};

export const isValidImageUrl = (url: string): boolean => {
  const regex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/;
  return regex.test(url);
};
