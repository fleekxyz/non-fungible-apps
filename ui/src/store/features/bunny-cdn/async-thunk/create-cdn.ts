import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { AppLog } from '@/utils';

import { bunnyCDNActions } from '../bunny-cdn-slice';
import { BunnyCDNClient } from '../bunny-cdn-client';
import { env } from '@/constants';
import axios, { AxiosError } from 'axios';

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
    } catch (error: Error | AxiosError | any) {
      let message = 'Failed to create the CDN record. Please, try again';

      if (
        axios.isAxiosError(error) &&
        error.response?.data.message.name ===
          env.bunnyCDN.errorMessages.nameTaken
      ) {
        message =
          'Pullzone name is already taken. Please, try again with a different name';
      }

      AppLog.errorToast(message, error);
      dispatch(bunnyCDNActions.setState('failed'));
    }
  }
);
