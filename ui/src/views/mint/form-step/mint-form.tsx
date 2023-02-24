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
import { validateEnsField } from './form.validations';
import { useState } from 'react';

export const FormStep = () => {
  const { prevStep, nextStep } = Stepper.useContext();
  const { appName, appDescription, domain, ens, setEnsError } =
    Mint.useContext();
  const [loading, setLoading] = useState(false);

  const handlePrevStep = () => {
    prevStep();
  };

  const handleNextStep = async () => {
    //validate fields
    setLoading(true);
    if (ens !== '') {
      const isValid = await validateEnsField(ens, setEnsError);
      setLoading(false);
      if (!isValid) return;
    }
    nextStep();
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
            onClick={handleNextStep}
            isLoading={loading}
          >
            Continue
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
