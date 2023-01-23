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
import { Icon } from '../core/icon';
import { WalletType } from './wallet.utils';

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
    <Menu colorScheme={'custom.gray.200'}>
      <Button borderRadius="50px" as={MenuButton}>
        <Flex alignItems={'center'}>
          <Icon
            name={WalletType[provider?.toString() as keyof typeof WalletType]}
            mr="0.5em"
          />
          {contractAddress(account)}
        </Flex>
      </Button>
      <MenuList bg={'custom.gray.200'}>
        <MenuItem
          _hover={{ bg: 'custom.gray.100' }}
          bg={'custom.gray.200'}
          onClick={handleCopyAccount}
        >
          Copy Account
        </MenuItem>
        <MenuItem
          _hover={{ bg: 'custom.gray.100' }}
          bg={'custom.gray.200'}
          onClick={handleDisconnect}
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
        isLoading={state === 'loading'}
        disabled={state === 'loading'}
      >
        Connect
      </Button>
      <MenuList bg={'custom.gray.200'}>
        <MenuItem
          _hover={{ bg: 'custom.gray.100' }}
          bg={'custom.gray.200'}
          onClick={handleConnectWallet}
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
