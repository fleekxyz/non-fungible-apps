import { configureStore } from '@reduxjs/toolkit';
import githubReducer from './features/github/github-slice';
import toastsReducer from './features/toasts/toasts-slice';
import ensReducer from './features/ens/ens-slice';

export const store = configureStore({
  reducer: {
    ens: ensReducer,
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
