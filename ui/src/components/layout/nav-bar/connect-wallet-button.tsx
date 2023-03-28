import { Button, Flex, Icon } from '@/components';
import { ConnectKitButton, Avatar } from 'connectkit';

export const ConnectWalletButton = () => {
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
