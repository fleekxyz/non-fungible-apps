import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import * as asyncThunk from './async-thunk';

export enum MetamaskConnectionState {
  NotInstalled,
  Disconnected,
  Loading,
  Connected,
}

interface MetamaskState {
  state: MetamaskConnectionState;
  account?: string;
}

const initialState: MetamaskState = {
  account: undefined,
  state: MetamaskConnectionState.Disconnected,
};

export const metamaskSlice = createSlice({
  name: 'metamask',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<string>) => {
      state.state = MetamaskConnectionState.Connected;
      state.account = action.payload;
    },
    setState: (
      state,
      action: PayloadAction<
        | MetamaskConnectionState.Disconnected
        | MetamaskConnectionState.Loading
        | MetamaskConnectionState.NotInstalled
      >
    ) => {
      state.state = action.payload;
      state.account = undefined;
    },
  },
});

export const metamaskActions = {
  ...metamaskSlice.actions,
  ...asyncThunk,
};

const selectMetamaskState = (state: RootState): MetamaskState => state.metamask;

export const useMetamaskStore = (): MetamaskState =>
  useAppSelector(selectMetamaskState);

export default metamaskSlice.reducer;
