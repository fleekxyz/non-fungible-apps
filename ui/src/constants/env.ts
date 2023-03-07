export const env = Object.freeze({
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
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
  },
  apollo: {
    uri: import.meta.env.VITE_GRAPHQL_URI || '',
  },
});
