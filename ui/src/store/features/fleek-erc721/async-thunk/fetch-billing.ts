import { createAsyncThunk } from '@reduxjs/toolkit';

import { FleekERC721 } from '@/integrations';
import { fleekERC721Actions, FleekERC721State, RootState } from '@/store';
import { AppLog } from '@/utils';

type FetchBilling = FleekERC721State.BillingKeys;

export const fetchBilling = createAsyncThunk<void, FetchBilling>(
  'fleekERC721/fetchBilling',
  async (key, { dispatch, getState }) => {
    const { billingState } = (getState() as RootState).fleekERC721;

    if (billingState[key] === 'loading') return;

    try {
      dispatch(fleekERC721Actions.setBillingState({ key, value: 'loading' }));

      const value = await FleekERC721.getBilling(key);

      dispatch(fleekERC721Actions.setBilling({ key, value }));
    } catch (error) {
      AppLog.error(error);
      dispatch(fleekERC721Actions.setBillingState({ key, value: 'failed' }));
    }
  }
);
