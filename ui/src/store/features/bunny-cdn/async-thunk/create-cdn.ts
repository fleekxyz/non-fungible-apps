import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { AppLog } from '@/utils';

import { bunnyCDNActions } from '../bunny-cdn-slice';
import { BunnyCDNClient } from '../bunny-cdn-client';

type CNAMERecord = {
  sourceDomain: string;
  targetDomain: string;
};

export const createPullzone = createAsyncThunk<void, CNAMERecord>(
  'BunnyCDN/CreateCDN',
  async ({ sourceDomain, targetDomain }, { dispatch, getState }) => {
    const { state } = (getState() as RootState).bunnyCDN;

    if (state === 'loading') return;

    try {
      dispatch(bunnyCDNActions.setState('loading'));

      const CDNRecord = await BunnyCDNClient.createPullzone(
        sourceDomain,
        targetDomain
      );

      dispatch(bunnyCDNActions.setCDNRecordData(CDNRecord));
    } catch (error) {
      AppLog.errorToast(
        'Failed to create the CDN record. Please, try again',
        error
      );
      dispatch(bunnyCDNActions.setState('failed'));
    }
  }
);
