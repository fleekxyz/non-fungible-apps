import { Button, Icon, Stepper } from '@/components';
import { ConnectKitButton } from 'connectkit';

export const ConnectWalletButton = () => {
  const { nextStep } = Stepper.useContext();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, address }) => {
        if (isConnected && address) {
          setTimeout(() => {
            nextStep();
          }, 2500);
        }
        return (
          <Button
            // isLoading={isConnected && !!address}
            disabled={isConnected}
            iconSpacing={isConnected && !!address ? '4' : '44'}
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
            {isConnected && !!address
              ? `Connected address: ${truncatedAddress}`
              : 'Connect Wallet'}
          </Button>
        );
        // }
      }}
    </ConnectKitButton.Custom>
  );
};
