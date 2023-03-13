import { Button, Icon, Stepper } from '@/components';
import { useDebounce } from '@/hooks/use-debounce';
import { pushToast } from '@/utils';
import { ConnectKitButton } from 'connectkit';

export const ConnectWalletButton = () => {
  const { nextStep } = Stepper.useContext();

  const loadingDebounce = useDebounce(
    (address: string) =>
      pushToast('success', `Connected address: ${address}. Let's go!`, {
        onDismiss: () => nextStep(),
      }),
    2000
  );

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, address }) => {
        if (isConnected && !!address) {
          loadingDebounce(truncatedAddress);
        }
        return (
          <Button
            isLoading={isConnected && !!address}
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
            Connect Wallet
          </Button>
        );
        // }
      }}
    </ConnectKitButton.Custom>
  );
};
