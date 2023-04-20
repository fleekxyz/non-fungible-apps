import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';

import * as asyncThunk from './async-thunk';

export namespace ENSState {
  export type QueryState = undefined | 'loading' | 'failed' | 'success';

  export type Address = {
    state: QueryState;
    value?: string;
  };

  export type AddressMap = Record<string, Address>;
}

export interface ENSState {
  addressMap: ENSState.AddressMap;
}

const initialState: ENSState = {
  addressMap: {},
};

export const ENSSlice = createSlice({
  name: 'ENSSLice',
  initialState,
  reducers: {
    setAddress: (
      state,
      action: PayloadAction<{
        key: string;
        value: ENSState.Address;
      }>
    ) => {
      state.addressMap[action.payload.key] = action.payload.value;
    },
  },
});

export const ENSActions = {
  ...ENSSlice.actions,
  ...asyncThunk,
};

const selectENSState = (state: RootState): ENSState => state.ENS;

export const useENSStore = (): ENSState => useAppSelector(selectENSState);

export default ENSSlice.reducer;
