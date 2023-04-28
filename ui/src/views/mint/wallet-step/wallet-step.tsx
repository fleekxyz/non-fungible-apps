import { Card, Grid } from '@/components';
import { MintCardContainer, MintCardHeader } from '@/views/mint/mint-card';

import { ConnectWalletButton } from './connect-wallet-button';

export const WalletStep: React.FC = () => {
  return (
    <MintCardContainer>
      <MintCardHeader title="Connect Wallet" />
      <Card.Body>
        <Grid css={{ rowGap: '$6' }}>
          <ConnectWalletButton />
          <Card.Text
            css={{
              height: '$46h',
              maxWidth: '$95',
              fontSize: '$md',
              px: '$12',
            }}
          >
            <span>Connect with the wallet you want to mint & own the NFA.</span>
          </Card.Text>
        </Grid>
      </Card.Body>
    </MintCardContainer>
  );
};
