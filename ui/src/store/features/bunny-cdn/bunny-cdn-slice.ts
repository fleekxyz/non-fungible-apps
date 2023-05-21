import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';

import * as asyncThunk from './async-thunk';

export namespace BunnyCDNState {
  export type CreateCDNState =
    | undefined
    | 'loading'
    | 'unferified'
    | 'failed'
    | 'success';
}

export interface BunnyCDNState {
  state: BunnyCDNState.CreateCDNState;
  bunnyURL: string;
}

const initialState: BunnyCDNState = {
  state: undefined,
  bunnyURL: '',
};

export const bunnyCDNSlice = createSlice({
  name: 'BunnyCDNSlice',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<BunnyCDNState.CreateCDNState>) => {
      state.state = action.payload;
    },
    setCDNRecordData: (state, action: PayloadAction<string>) => {
      state.bunnyURL = action.payload;
      state.state = 'success';
    },
  },
});

export const bunnyCDNActions = {
  ...bunnyCDNSlice.actions,
  ...asyncThunk,
};

const selectBunnyCDNState = (state: RootState): BunnyCDNState => state.bunnyCDN;

export const useBunnyCDNStore = (): BunnyCDNState =>
  useAppSelector(selectBunnyCDNState);

export default bunnyCDNSlice.reducer;
