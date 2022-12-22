import { createAsyncThunk } from '@reduxjs/toolkit';
import { walletActions, WalletState } from '../wallet-slice';
import { RootState } from '@/store/store';
import { Ethereum } from '@/integrations';

export const connect = createAsyncThunk<
  void,
  Exclude<WalletState.Provider, null>
>('wallet/connect', async (providerName, { dispatch, getState }) => {
  if ((getState() as RootState).wallet.state === 'loading') return;

  try {
    dispatch(walletActions.setState('loading'));
    dispatch(walletActions.setProvider(providerName));

    const response = await Ethereum.provider[providerName].send(
      'eth_requestAccounts',
      []
    );

    if (Array.isArray(response)) {
      const [account] = response;

      if (typeof account !== 'string') throw Error('Invalid account type');
      dispatch(walletActions.setAccount(account));
      return;
    }

    throw Error('Invalid response type');
  } catch (e) {
    console.error('Could not connect to Wallet', e);
    dispatch(walletActions.setState('disconnected'));
  }
});
