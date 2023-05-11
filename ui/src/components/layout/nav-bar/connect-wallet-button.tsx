import { Avatar, ConnectKitButton } from 'connectkit';

import { Button, Flex } from '@/components';

export const ConnectWalletButton: React.FC = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, address, ensName }) => {
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
