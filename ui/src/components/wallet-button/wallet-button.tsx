import { useCallback } from 'react';
import { useAppDispatch, useWalletStore, walletActions } from '@/store';
import { contractAddress } from '@/utils';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';

const WalletMenu: React.FC = () => {
  const { account = '', provider } = useWalletStore();

  const dispatch = useAppDispatch();

  const handleCopyAccount = useCallback(() => {
    navigator.clipboard.writeText(account);
  }, [account]);

  const handleDisconnect = useCallback(() => {
    dispatch(walletActions.disconnect());
  }, [dispatch]);

  return (
    <Menu>
      <MenuButton as={Button}>
        {`${provider} (${contractAddress(account)})`}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleCopyAccount}>Copy Account</MenuItem>
        <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
      </MenuList>
    </Menu>
  );
};

const ConnectionMenu: React.FC = () => {
  const { state } = useWalletStore();

  const dispatch = useAppDispatch();

  const handleConnectWallet = useCallback(() => {
    dispatch(walletActions.connect('metamask'));
  }, [dispatch]);

  return (
    <Menu>
      <MenuButton
        as={Button}
        isLoading={state === 'loading'}
        disabled={state === 'loading'}
      >
        Connect Wallet
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleConnectWallet}>Metamask</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const WalletButton: React.FC = () => {
  const { state } = useWalletStore();

  if (state === 'connected') {
    return <WalletMenu />;
  }

  return <ConnectionMenu />;
};
