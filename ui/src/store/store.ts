import { configureStore } from '@reduxjs/toolkit';
import metamaskReducer from './features/metamask/metamask-slice';

export const store = configureStore({
  reducer: {
    metamask: metamaskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
