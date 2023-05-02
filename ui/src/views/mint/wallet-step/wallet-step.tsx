import {
  Card,
  CustomCardContainer,
  CustomCardHeader,
  Grid,
} from '@/components';

import { ConnectWalletButton } from './connect-wallet-button';

export const WalletStep: React.FC = () => {
  return (
    <CustomCardContainer>
      <CustomCardHeader.Default title="Connect Wallet" />
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
    </CustomCardContainer>
  );
};
