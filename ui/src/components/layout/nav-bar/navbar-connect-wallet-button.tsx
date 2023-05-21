import { Avatar, ConnectKitButton } from 'connectkit';
import { useEffect } from 'react';
import { useAccount, useEnsName } from 'wagmi';

import { Button, Flex } from '@/components';
import { ENSActions, useAppDispatch, useENSStore } from '@/store';

export const NavBarConnectWalletButton: React.FC = () => {
  const { addressMap } = useENSStore();
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (address === undefined) return;

    const stored = addressMap[address] || {};
    if (typeof stored.state !== 'undefined') return;
    if (ensName === null) return;

    dispatch(
      ENSActions.setAddress({
        key: address,
        value: { state: 'success', value: ensName },
      })
    );
  }, [address, addressMap, dispatch, ensName]);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, address, ensName }) => {
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
