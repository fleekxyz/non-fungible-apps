import { Avatar, ConnectKitButton } from 'connectkit';

import { Button, Flex } from '@/components';
import { useDispatch } from 'react-redux';
import { ENSActions } from '@/store';

export const ConnectWalletButton: React.FC = () => {
  const dispatch = useDispatch();

  const setEnsNameStore = (ensName: string, address: string) => {
    dispatch(
      ENSActions.setAddress({
        key: address,
        value: { state: 'success', value: ensName },
      })
    );
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, address, ensName }) => {
        if (ensName && address) setEnsNameStore(ensName, address);

        return (
          <Button onClick={show}>
            {isConnected && !!address && !!truncatedAddress ? (
              <Flex css={{ gap: '$2' }}>
                <Avatar address={address} size={20} />
                <span>{ensName || truncatedAddress}</span>
              </Flex>
            ) : (
              'Connect Wallet'
            )}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
