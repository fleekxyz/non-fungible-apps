import { configureStore } from '@reduxjs/toolkit';

import ENSReducer from './features/ens/ens-slice';
import fleekERC721Reducer from './features/fleek-erc721/fleek-erc721-slice';
import githubReducer from './features/github/github-slice';
import toastsReducer from './features/toasts/toasts-slice';

export const store = configureStore({
  reducer: {
    fleekERC721: fleekERC721Reducer,
    github: githubReducer,
    toasts: toastsReducer,
    ENS: ENSReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
