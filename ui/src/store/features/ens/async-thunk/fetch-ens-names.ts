/* eslint-disable no-console */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Ethereum } from '@/integrations';
import { RootState } from '@/store';

import { ensActions } from '../ens-slice';

export const fetchEnsNamesThunk = createAsyncThunk<void, `0x${string}`>(
  'ens/fetchEnsNames',
  async (address, { dispatch, getState }) => {
    const { state } = (getState() as RootState).ens;
    if (state === 'loading') return;

    try {
      dispatch(ensActions.setState('loading'));

      //fetch ens names for received addresses
      const ensList = await Ethereum.getEnsName(address);

      dispatch(ensActions.setEnsNames(ensList));
    } catch (error) {
      console.log(error);
      dispatch(ensActions.setState('failed'));
    }
  }
);
