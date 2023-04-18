import { RootState } from '@/store';
import { AppLog } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { bunnyCDNActions } from '../bunny-cdn-slice';
import { createBunnyCDNMock } from '@/mocks';

type CNAMERecord = {
  domain: string;
  targetDomain: string;
};

export const createBunnyCDN = createAsyncThunk<void, CNAMERecord>(
  'BunnyCDN/CreateCDN',
  async ({ domain, targetDomain }, { dispatch, getState }) => {
    const { state } = (getState() as RootState).bunnyCDN;

    if (state === 'loading') return;

    try {
      dispatch(bunnyCDNActions.setState('loading'));

      const CDNRecord = await createBunnyCDNMock(domain, targetDomain);

      dispatch(bunnyCDNActions.setCDNRecordData(CDNRecord.bunnyURL));
    } catch (error) {
      AppLog.errorToast(
        'Failed to create the CDN record. Please, try again',
        error
      );
      dispatch(bunnyCDNActions.setState('failed'));
    }
  }
);
