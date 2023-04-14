import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { ENSActions, RootState } from '@/store';
import { AppLog } from '@/utils';

export const resolveAddress = createAsyncThunk<void, string>(
  'ENS/fetchAddress',
  async (address, { dispatch, getState }) => {
    const { addressMap } = (getState() as RootState).ENS;
    const stored = addressMap[address] || {};

    if (stored.state === 'loading') return;

    try {
      dispatch(
        ENSActions.setAddress({ key: address, value: { state: 'loading' } })
      );

      const value = await ethers.providers
        .getDefaultProvider()
        .lookupAddress(address);

      dispatch(
        ENSActions.setAddress({
          key: address,
          value: { state: 'success', value },
        })
      );
    } catch (error) {
      AppLog.error('Failed to resolve ENS name by address', error);
      dispatch(
        ENSActions.setAddress({ key: address, value: { state: 'loading' } })
      );
    }
  }
);
