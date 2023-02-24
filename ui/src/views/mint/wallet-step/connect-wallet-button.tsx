import { Button, Icon, Stepper } from '@/components';
import { ConnectKitButton } from 'connectkit';

export const ConnectWalletButton = () => {
  const { nextStep } = Stepper.useContext();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, address }) => {
        if (isConnected && address) {
          return (
            <Button onClick={nextStep} css={{ color: '$slate12' }}>
              Connected address: {truncatedAddress}. Continue
            </Button>
          );
        } else {
          return (
            <Button
              disabled={isConnected}
              iconSpacing="44"
              size="lg"
              variant="ghost"
              css={{
                backgroundColor: '$slate4',
                color: '$slate12',
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
