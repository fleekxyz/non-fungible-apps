import { Button, Card, Grid, Stepper } from '@/components';
import { Mint } from '../mint.context';
import {
  LogoField,
  AppDescriptionField,
  AppNameField,
  EnsDomainField,
  VerifyNFAField,
} from './fields';
import { MintCardHeader } from '../mint-card';
import { useAccount } from 'wagmi';

export const FormStep = () => {
  const { address } = useAccount();
  const { prevStep, nextStep } = Stepper.useContext();
  const { appName, appDescription, domain } = Mint.useContext();

  //TODO remove once it's integrated with mint function
  console.log('address', address);
  const handlePrevStep = () => {
    prevStep();
  };

  return (
    <Card.Container css={{ width: '$107h' }}>
      <MintCardHeader title="NFA Details" onClickBack={handlePrevStep} />
      <Card.Body>
        <Grid
          css={{
            rowGap: '$6',
          }}
        >
          <Grid css={{ rowGap: '$4' }}>
            <AppNameField />
            <AppDescriptionField />
            <LogoField />
            <EnsDomainField />
            <VerifyNFAField />
          </Grid>
          <Button
            disabled={!appName || !appDescription || !domain}
            colorScheme="blue"
            variant="solid"
            onClick={nextStep}
          >
            Continue
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
