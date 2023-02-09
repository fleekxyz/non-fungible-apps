import { Button, Card, Grid, Icon, IconButton, Stepper } from '@/components';
import { Mint } from '../mint.context';
import { LogoField } from './fields/logo/logo-field';
import { AppDescriptionField, AppNameField, EnsDomainField } from './fields';
import { VerifyNFAField } from './fields/verify-nfa-field';

export const FormStep = () => {
  const { prevStep, nextStep } = Stepper.useContext();
  const { appName, appDescription, domain } = Mint.useContext();

  return (
    <Card.Container css={{ width: '424px' }}>
      <Card.Heading
        title="NFA Details"
        leftIcon={
          <IconButton
            aria-label="Add"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="back" />}
            css={{ mr: '$2' }}
            onClick={prevStep}
          />
        }
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
