import { Card, Grid, Icon, IconButton } from '@/components';

import { ConnectWalletButton } from './connect-wallet-button';

export const WalletStep = () => {
  return (
    <Card.Container>
      <Card.Heading
        title="Connect Wallet"
        rightIcon={
          <IconButton
            aria-label="Add"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="info" />}
          />
        }
      />
      <Card.Body>
        <Grid css={{ rowGap: '$6' }}>
          <ConnectWalletButton />
          <Card.Text
            css={{ height: '$46h', width: '$95', fontSize: '$md', px: '$12' }}
          >
            <span>Connect with the wallet you want to mint & own the NFA.</span>
          </Card.Text>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
