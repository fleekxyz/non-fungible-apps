import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './features/wallet/wallet-slice';
import githubReducer from './features/github/github-slice';
import ensReducer from './features/ens/ens-slice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    github: githubReducer,
    ens: ensReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
