import { Avatar, ConnectKitButton } from 'connectkit';

import { Button, Flex } from '@/components';
import { ENSActions, useAppDispatch, useENSStore } from '@/store';

export const ConnectWalletButton: React.FC = () => {
  const { addressMap } = useENSStore();
  const dispatch = useAppDispatch();

  const setEnsNameStore = (ensName: string, address: string): void => {
    const stored = addressMap[address] || {};
    if (typeof stored.state !== 'undefined') return;

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
          <Button onClick={show} css={{ gridArea: 'wallet' }}>
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
