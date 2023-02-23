import { Button, Card, Grid, Icon, Stepper } from '@/components';
import { MintCardHeader } from '../mint-card';
import { ConnectWalletButton } from './connect-wallet-button';

export const WalletStep = () => {
  const { prevStep } = Stepper.useContext();
  return (
    <Card.Container>
      <MintCardHeader title="Connect Wallet" onClickBack={prevStep} />
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
