export const env = Object.freeze({
  alchemy: {
    id: import.meta.env.VITE_ALCHEMY_API_KEY || '',
    appName: import.meta.env.VITE_ALCHEMY_APP_NAME || '',
  },
});
