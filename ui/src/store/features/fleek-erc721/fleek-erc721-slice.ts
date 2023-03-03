import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import * as asyncThunk from './async-thunk';
import { FleekERC721 } from '@/integrations';

export namespace FleekERC721State {
  export type QueryState = undefined | 'loading' | 'failed' | 'success';

  export type BillingKeys = keyof typeof FleekERC721.Enums.Billing;

  export type Billing = {
    [key in BillingKeys]?: string;
  };

  export type BillingState = {
    [key in BillingKeys]?: QueryState;
  };
}

export interface FleekERC721State {
  billing: FleekERC721State.Billing;
  billingState: FleekERC721State.BillingState;
}

const initialState: FleekERC721State = {
  billing: {},
  billingState: {},
};

export const fleekERC721Slice = createSlice({
  name: 'fleekERC721',
  initialState,
  reducers: {
    setBilling: (
      state,
      action: PayloadAction<{
        key: FleekERC721State.BillingKeys;
        value: string;
      }>
    ) => {
      state.billing[action.payload.key] = action.payload.value;
      state.billingState[action.payload.key] = 'success';
    },
    setBillingState: (
      state,
      action: PayloadAction<{
        key: FleekERC721State.BillingKeys;
        value: Exclude<FleekERC721State.QueryState, 'success' | undefined>;
      }>
    ) => {
      state.billingState[action.payload.key] = action.payload.value;
    },
  },
});

export const fleekERC721Actions = {
  ...fleekERC721Slice.actions,
  ...asyncThunk,
};

const selectFleekERC721State = (state: RootState): FleekERC721State =>
  state.fleekERC721;

export const useFleekERC721Store = (): FleekERC721State =>
  useAppSelector(selectFleekERC721State);

export default fleekERC721Slice.reducer;
