import { Ethereum } from '@/integrations';
import { RootState } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ensActions } from '../ens-slice';

export const fetchEnsNamesThunk = createAsyncThunk<void, `0x${string}`>(
  'ens/fetchEnsNames',
  async (address, { dispatch, getState }) => {
    const { state } = (getState() as RootState).ens;
    if (state === 'loading') return;
    try {
      dispatch(ensActions.setState('loading'));

      //fetch ens names for received addresses
      const ensList = await Ethereum.getEnsName(
        '0xbd6bbe64bf841b81fc5a6e2b760029e316f2783b'
      );

      dispatch(ensActions.setEnsNames(ensList));
    } catch (error) {
      console.log(error);
      dispatch(ensActions.setState('failed'));
    }
  }
);
