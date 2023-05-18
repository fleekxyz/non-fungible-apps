import { ConnectKitButton } from 'connectkit';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { Stepper } from '@/components';

import { ButtonConnection } from '../button-connection';

export const ConnectWalletButton: React.FC = () => {
  const { address } = useAccount();
  const { nextStep } = Stepper.useContext();

  useEffect(() => {
    if (address) nextStep();
  }, [address, nextStep]);

  return (
    <ConnectKitButton.Custom>
      {({ show }) => {
        return (
          <ButtonConnection
            icon={'ethereum'}
            label={'Connect Wallet'}
            onClick={show}
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};
