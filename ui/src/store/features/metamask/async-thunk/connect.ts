import { createAsyncThunk } from '@reduxjs/toolkit';
import { metamaskSlice, MetamaskConnectionState } from '../metamask-slice';
import { RootState } from '@/store/store';

const ethereum = window.ethereum;

export const connect = createAsyncThunk<void>(
  'metamask/connect',
  async (_, { dispatch, getState }): Promise<void> => {
    if (
      (getState() as RootState).metamask.state ===
      MetamaskConnectionState.Loading
    )
      return;

    try {
      dispatch(metamaskSlice.actions.setState(MetamaskConnectionState.Loading));
      const response = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (Array.isArray(response)) {
        const [account] = response;

        if (typeof account !== 'string') throw Error('Invalid account type');
        dispatch(metamaskSlice.actions.setAccount(account));
        return;
      }

      throw Error('Invalid response type');
    } catch (e) {
      console.error('Could not connect to Metamask', e);
      dispatch(
        metamaskSlice.actions.setState(MetamaskConnectionState.Disconnected)
      );
    }
  }
);
