import { Button, Icon, Stepper } from '@/components';
import { ConnectKitButton } from 'connectkit';

export const ConnectWalletButton = () => {
  const { nextStep } = Stepper.useContext();

  const handleIsConnected = () => {
    //TODO maybe add an option to disconnect wallet/change wallet
    setTimeout(() => {
      nextStep();
    }, 1000);
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        if (isConnected) handleIsConnected();
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
      }}
    </ConnectKitButton.Custom>
  );
};
