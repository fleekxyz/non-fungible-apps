import { ConnectKitButton } from 'connectkit';

import { Button, Stepper } from '@/components';

import { ButtonConnection } from '../button-connection';

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
            <ButtonConnection
              icon={'ethereum'}
              label={' Connect Wallet'}
              disabled={isConnected}
              onClick={show}
            />
          );
        }
      }}
    </ConnectKitButton.Custom>
  );
};
