import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';

export interface AppState {
  overlayColor?: string;
}

const initialState: AppState = {
  overlayColor: undefined,
};

export const appSlice = createSlice({
  name: 'AppSlice',
  initialState,
  reducers: {
    setOverlayColor: (state, action: PayloadAction<string>) => {
      state.overlayColor = action.payload;
    },
    clearOverlayColor: (state) => {
      state.overlayColor = undefined;
    },
  },
});

export const appActions = appSlice.actions;

const selectAppState = (state: RootState): AppState => state.app;

export const useAppStore = (): AppState => useAppSelector(selectAppState);

export default appSlice.reducer;
