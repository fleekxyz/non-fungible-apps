export const env = Object.freeze({
  environment: import.meta.env.MODE,
  alchemy: {
    id: import.meta.env.VITE_ALCHEMY_API_KEY || '',
    appName: import.meta.env.VITE_ALCHEMY_APP_NAME || '',
  },
  ens: {
    contractAddress: import.meta.env.VITE_ENS_ADDRESS || '',
    validationEnsURL: import.meta.env.VITE_ENS_VALIDATION_URL || '',
  },
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '', TODO remove is not needed cause we're not using analytics
  },
  twitter: {
    url: import.meta.env.VITE_TWITTER_URL || '',
  },
  sepolia: {
    rpc: import.meta.env.VITE_SEPOLIA_RPC || '',
  },
  goerli: {
    rpc: import.meta.env.VITE_GOERLI_RPC || '',
  },
  bunnyCDN: {
    url: import.meta.env.VITE_BUNNYCDN_URL || '',
    alchemySignature: import.meta.env.VITE_BUNNYCDN_ALCHEMY_SIGNATURE || '',
    feSigningKey: import.meta.env.VITE_FE_SIGNING_KEY || '',
    createPullzone: import.meta.env.VITE_BUNNYCDN_CREATE_PULLZONE || '',
    verifyPullzone: import.meta.env.VITE_BUNNYCDN_VERIFY_PULLZONE || '',
    errorMessages: {
      nameTaken:
        import.meta.env.VITE_BUNNYCDN_ERROR_MESSAGE_NAME_TAKEN ||
        'pullzone.hostname_already_registered',
    },
  },
  QANet: {
    rpc: import.meta.env.VITE_QA_NET_RCP || '',
  },
});
