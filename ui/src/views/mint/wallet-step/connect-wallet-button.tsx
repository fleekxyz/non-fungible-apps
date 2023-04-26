import { ConnectKitButton } from 'connectkit';

import { Button, Icon, Stepper } from '@/components';

export const ConnectWalletButton: React.FC = () => {
  const { nextStep } = Stepper.useContext();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, address }) => {
        if (isConnected && address) {
          return (
            <Button onClick={nextStep} css={{ color: '$slate12' }}>
              {truncatedAddress}. Continue
            </Button>
          );
        } else {
          return (
            <Button
              disabled={isConnected}
              size="lg"
              variant="ghost"
              css={{
                backgroundColor: '$slate4',
                color: '$slate12',
                justifyContent: 'space-between', //TODO remove
                py: '$2h',
              }}
              onClick={show}
              rightIcon={
                <Icon
                  name="ethereum"
                  css={{ color: 'white', fontSize: '$4xl' }}
                />
              }
            >
              Connect Wallet
            </Button>
          );
        }
      }}
    </ConnectKitButton.Custom>
  );
};
