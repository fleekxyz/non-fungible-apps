import { RootState } from '@/store';
import { AppLog } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { bunnyCDNActions } from '../bunny-cdn-slice';
import { verifyBunnyCDNMock } from '@/mocks';

export const verifyAP = createAsyncThunk<void, string>(
  'BunnyCDN/VerifyAP',
  async (domain, { dispatch, getState }) => {
    const { state } = (getState() as RootState).bunnyCDN;

    if (state === 'loading') return;

    try {
      dispatch(bunnyCDNActions.setState('loading'));

      const verifyAPState = await verifyBunnyCDNMock(domain);

      if (verifyAPState) dispatch(bunnyCDNActions.setState('success'));
      else {
        AppLog.errorToast('We couldn`t verify the domain. Please, try again');
        dispatch(bunnyCDNActions.setState('failed'));
      }
    } catch (error) {
      AppLog.errorToast(
        'There was an error trying to verify the domain. Please, try again',
        error
      );
      dispatch(bunnyCDNActions.setState('failed'));
    }
  }
);
