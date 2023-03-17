import { configureStore } from '@reduxjs/toolkit';
import githubReducer from './features/github/github-slice';
import toastsReducer from './features/toasts/toasts-slice';
import ensReducer from './features/ens/ens-slice';
import fleekERC721Reducer from './features/fleek-erc721/fleek-erc721-slice';

export const store = configureStore({
  reducer: {
    ens: ensReducer,
    fleekERC721: fleekERC721Reducer,
    github: githubReducer,
    toasts: toastsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
