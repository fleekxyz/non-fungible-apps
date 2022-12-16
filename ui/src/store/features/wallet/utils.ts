import { Ethereum } from '@/integrations';
import { store } from '../../store';
import { walletActions } from './wallet-slice';

export const initializeWallet = async (): Promise<void> => {
  // metamask
  try {
    const metamask = Ethereum.provider.metamask;
    const accounts = await metamask.listAccounts();
    if (accounts && accounts.length > 0) {
      store.dispatch(walletActions.setAccount(accounts[0]));
    }
    metamask.on('accountsChanged', (accounts: string[]) => {
      store.dispatch(walletActions.setAccount(accounts[0]));
    });
    store.dispatch(walletActions.setProvider('metamask'));
  } catch {}
};
