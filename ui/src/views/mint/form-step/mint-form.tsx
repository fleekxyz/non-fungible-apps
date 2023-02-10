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

export const FormStep = () => {
  const { prevStep, nextStep } = Stepper.useContext();
  const { appName, appDescription, domain } = Mint.useContext();

  return (
    <Card.Container css={{ width: '$107h' }}>
      <MintCardHeader title="NFA Details" onClickBack={prevStep} />
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
