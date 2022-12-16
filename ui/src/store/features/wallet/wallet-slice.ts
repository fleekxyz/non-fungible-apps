import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as asyncThunk from './async-thunk';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { Ethereum } from '@/integrations';

export namespace WalletState {
  export type Provider = Ethereum.Providers | null;

  export type State = 'disconnected' | 'loading' | 'connected';

  export type Account = string;
}

export interface WalletState {
  provider: WalletState.Provider;
  state: WalletState.State;
  account?: WalletState.Account;
}

const initialState: WalletState = {
  provider: null,
  state: 'disconnected',
  account: undefined,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<WalletState.Provider>) => {
      state.provider = action.payload;
    },
    setAccount: (state, action: PayloadAction<string>) => {
      state.state = 'connected';
      state.account = action.payload;
    },
    setState: (
      state,
      action: PayloadAction<Exclude<WalletState.State, 'connected'>>
    ) => {
      state.state = action.payload;
      state.provider = null;
      state.account = undefined;
    },
    disconnect: (state) => {
      state.state = 'disconnected';
      state.provider = null;
      state.account = undefined;
    },
  },
});

export const walletActions = {
  ...walletSlice.actions,
  ...asyncThunk,
};

const selectWalletState = (state: RootState): WalletState => state.wallet;

export const useWalletStore = (): WalletState =>
  useAppSelector(selectWalletState);

export default walletSlice.reducer;
