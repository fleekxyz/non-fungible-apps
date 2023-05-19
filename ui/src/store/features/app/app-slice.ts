import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';

export interface AppState {
  backgroundColor?: string;
}

const initialState: AppState = {
  backgroundColor: undefined,
};

export const appSlice = createSlice({
  name: 'AppSlice',
  initialState,
  reducers: {
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
    },
    clearBackgroundColor: (state) => {
      state.backgroundColor = undefined;
    },
  },
});

export const appActions = appSlice.actions;

const selectAppState = (state: RootState): AppState => state.app;

export const useAppStore = (): AppState => useAppSelector(selectAppState);

export default appSlice.reducer;
