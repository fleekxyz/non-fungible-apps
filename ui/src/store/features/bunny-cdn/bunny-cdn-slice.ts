import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';

import * as asyncThunk from './async-thunk';

export namespace BunnyCDNState {
  export type CreateCDNState = undefined | 'loading' | 'failed' | 'success';

  export type CNAMERecord = {
    recordType: 'CNAME' | 'ANAME';
    host: string;
    cdn: string;
  };
}

export interface BunnyCDNState {
  state: BunnyCDNState.CreateCDNState;
  cnameRecord: BunnyCDNState.CNAMERecord | undefined;
}

const initialState: BunnyCDNState = {
  state: undefined,
  cnameRecord: undefined,
};

export const bunnyCDNSlice = createSlice({
  name: 'BunnyCDNSlice',
  initialState,
  reducers: {
    setState: (
      state,
      action: PayloadAction<Exclude<BunnyCDNState.CreateCDNState, 'success'>>
    ) => {
      state.state = action.payload;
    },
    setCNAMERecordData: (
      state,
      action: PayloadAction<BunnyCDNState.CNAMERecord>
    ) => {
      state.cnameRecord = action.payload;
      state.state = 'success';
    },
  },
});

export const bunnyCDNActions = {
  ...bunnyCDNSlice.actions,
  ...asyncThunk,
};

const selectENSState = (state: RootState): BunnyCDNState => state.bunnyCDN;

export const useBunnyCDNStore = (): BunnyCDNState =>
  useAppSelector(selectENSState);

export default bunnyCDNSlice.reducer;
