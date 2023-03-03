import { configureStore } from '@reduxjs/toolkit';
import githubReducer from './features/github/github-slice';
import ensReducer from './features/ens/ens-slice';
import fleekERC721Reducer from './features/fleek-erc721/fleek-erc721-slice';

export const store = configureStore({
  reducer: {
    fleekERC721: fleekERC721Reducer,
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
