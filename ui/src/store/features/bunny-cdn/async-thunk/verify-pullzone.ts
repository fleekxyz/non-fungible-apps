import { createAsyncThunk } from '@reduxjs/toolkit';

import { verifyBunnyCDNMock } from '@/mocks';
import { RootState } from '@/store';
import { AppLog } from '@/utils';

import { bunnyCDNActions } from '../bunny-cdn-slice';

export const verifyBunnyPullzone = createAsyncThunk<void, string>(
  'BunnyCDN/VerifyPullzone',
  async (domain, { dispatch, getState }): Promise<void> => {
    const { state } = (getState() as RootState).bunnyCDN;

    if (state === 'loading') return;

    try {
      dispatch(bunnyCDNActions.setState('loading'));

      const verifyAPState = await verifyBunnyCDNMock(domain);

      if (verifyAPState) dispatch(bunnyCDNActions.setState('success'));
      throw new Error('Invalid AP state');
    } catch (error) {
      AppLog.errorToast(
        'There was an error trying to verify the domain. Please, try again',
        error
      );
      dispatch(bunnyCDNActions.setState('failed'));
    }
  }
);
