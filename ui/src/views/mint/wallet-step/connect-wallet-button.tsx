import { Button, Icon } from '@/components';

export const ConnectWalletButton = () => {
  return (
    <Button
      iconSpacing="52"
      size="lg"
      variant="ghost"
      css={{
        backgroundColor: '$slate4',
        color: '$slate12',
        py: '$2h',
      }}
      onClick={nextStep}
      rightIcon={
        <Icon name="ethereum" css={{ color: 'white', fontSize: '$4xl' }} />
      }
    >
      Connect Wallet
    </Button>
  );
};
