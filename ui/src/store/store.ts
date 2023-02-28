import { configureStore } from '@reduxjs/toolkit';
import githubReducer from './features/github/github-slice';

export const store = configureStore({
  reducer: {
    github: githubReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
