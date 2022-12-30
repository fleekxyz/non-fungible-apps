import { useCallback } from 'react';
import { useAppDispatch, useWalletStore, walletActions } from '@/store';
import { contractAddress } from '@/utils';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
} from '@chakra-ui/react';
import { ConnectedWalletIcon, CopyIcon, DisconnectIcon, WalletIcon } from './';

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
    <Menu colorScheme={'#282824'}>
      <Button borderRadius="50px" as={MenuButton}>
        <Flex alignItems={'center'}>
          <ConnectedWalletIcon provider={provider?.toString() as string} />
          {contractAddress(account)}
        </Flex>
      </Button>
      <MenuList bg={'#282824'}>
        <MenuItem
          _hover={{ bg: '#4b4b4b' }}
          bg={'#282824'}
          onClick={handleCopyAccount}
          icon={<CopyIcon />}
        >
          Copy Account
        </MenuItem>
        <MenuItem
          _hover={{ bg: '#4b4b4b' }}
          bg={'#282824'}
          onClick={handleDisconnect}
          icon={<DisconnectIcon />}
        >
          Disconnect
        </MenuItem>
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
      <Button
        borderRadius="50px"
        as={MenuButton}
        leftIcon={<WalletIcon />}
        isLoading={state === 'loading'}
        disabled={state === 'loading'}
      >
        Connect
      </Button>
      <MenuList bg={'#282824'}>
        <MenuItem
          _hover={{ bg: '#4b4b4b' }}
          bg={'#282824'}
          onClick={handleConnectWallet}
          icon={<ConnectedWalletIcon provider={'metamask'} />}
        >
          Metamask
        </MenuItem>
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
