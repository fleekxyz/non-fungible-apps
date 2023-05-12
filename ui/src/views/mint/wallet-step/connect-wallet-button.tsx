import { ConnectKitButton } from 'connectkit';

import { Stepper } from '@/components';

import { ButtonConnection } from '../button-connection';

export const ConnectWalletButton: React.FC = () => {
  const { nextStep } = Stepper.useContext();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        if (isConnected && address) {
          nextStep();
        } else {
          return (
            <ButtonConnection
              icon={'ethereum'}
              label={'Connect Wallet'}
              onClick={show}
            />
          );
        }
      }}
    </ConnectKitButton.Custom>
  );
};
