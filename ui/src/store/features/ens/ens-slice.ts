import { RootState, useAppSelector } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as asyncThunk from './async-thunk';

export namespace EnsState {
  export type State = 'idle' | 'loading' | 'success' | 'failed';

  export type EnsNames = string[];
}

export interface EnsState {
  state: EnsState.State;
  ensNames: EnsState.EnsNames;
}

const initialState: EnsState = {
  state: 'idle',
  ensNames: [],
};

export const ensSlice = createSlice({
  name: 'ens',
  initialState,
  reducers: {
    setEnsNames: (state, action: PayloadAction<EnsState.EnsNames>) => {
      state.ensNames = action.payload;
      state.state = 'success';
    },
    setState: (
      state,
      action: PayloadAction<Exclude<EnsState.State, 'success'>>
    ) => {
      state.state = action.payload;
    },
  },
});

export const ensActions = {
  ...ensSlice.actions,
  ...asyncThunk,
};

const selectEnsState = (state: RootState): EnsState => state.ens;

export const useEnsStore = (): EnsState => useAppSelector(selectEnsState);

export default ensSlice.reducer;
