import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { AppLog } from '@/utils';

import { BunnyCDNClient } from '../bunny-cdn-client';
import { bunnyCDNActions } from '../bunny-cdn-slice';

export const verifyBunnyPullzone = createAsyncThunk<void, string>(
  'BunnyCDN/VerifyPullzone',
  async (hostName, { dispatch, getState }): Promise<void> => {
    const { state } = (getState() as RootState).bunnyCDN;

    if (state === 'loading') return;

    try {
      dispatch(bunnyCDNActions.setState('loading'));

      const verifyAPState = await BunnyCDNClient.verifyPullzone(hostName);

      if (verifyAPState) dispatch(bunnyCDNActions.setState('success'));
      else throw new Error('Invalid AP state');
    } catch (error) {
      AppLog.errorToast(
        'There was an error trying to verify the hostName. Please, try again',
        error
      );
      dispatch(bunnyCDNActions.setState('failed'));
    }
  }
);
