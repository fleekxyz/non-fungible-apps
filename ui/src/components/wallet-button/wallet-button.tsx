import { useCallback } from 'react';
import { useAppDispatch, useWalletStore, walletActions } from '@/store';
import { Button } from '@chakra-ui/react';
import { contractAddress } from '@/utils';

const WalletMenu: React.FC = () => {
  const { account = '' } = useWalletStore();

  return <Button>Wallet {`(${contractAddress(account)})`}</Button>;
};

const ConnectionButton: React.FC = () => {
  const { state } = useWalletStore();

  const dispatch = useAppDispatch();

  const handleConnectWallet = useCallback(() => {
    dispatch(walletActions.connect('metamask'));
  }, [dispatch]);

  return (
    <Button
      onClick={handleConnectWallet}
      isLoading={state === 'loading'}
      disabled={state === 'loading'}
    >
      Connect Wallet
    </Button>
  );
};

export const WalletButton: React.FC = () => {
  const { state } = useWalletStore();

  if (state === 'connected') {
    return <WalletMenu />;
  }

  return <ConnectionButton />;
};
