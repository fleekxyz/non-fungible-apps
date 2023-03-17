import { Button, Card, Form, Grid, Stepper } from '@/components';
import { Mint } from '../../mint.context';
import {
  LogoField,
  AppDescriptionField,
  AppNameField,
  EnsDomainField,
} from './fields';
import { MintCardHeader } from '../../mint-card';
import { useAccount } from 'wagmi';
import { parseColorToNumber } from './form.utils';
import { AppLog } from '@/utils';
import { useMintFormContext } from './mint-form.context';

export const MintFormStep = () => {
  const {
    form: {
      appName: {
        value: [appName],
      },
      appDescription: {
        value: [appDescription],
      },
      appLogo: {
        value: [appLogo],
      },
      ens: {
        value: [ens],
      },
      domainURL: {
        value: [domainURL],
      },
      isValid: [isValid, setIsValid],
    },
  } = useMintFormContext();
  const { address } = useAccount();
  const { nextStep } = Stepper.useContext();
  const {
    billing,
    branchName,
    commitHash,
    repositoryName,
    logoColor,
    verifyNFA,
    setNfaStep,
  } = Mint.useContext();
  const { setArgs } = Mint.useTransactionContext();

  const handleNextStep = () => {
    if (!address) {
      AppLog.errorToast('No address found. Please connect your wallet.');
      return;
    }
    // TODO: we need to make sure all values are correct before
    // setting the args otherwise mint may fail
    setArgs([
      address,
      appName,
      appDescription,
      domainURL,
      ens,
      commitHash,
      `${repositoryName.url}/tree/${branchName.label}`,
      appLogo,
      parseColorToNumber(logoColor),
      verifyNFA,
      { value: billing },
    ]);

    nextStep();
  };

  const handlePrevStep = () => {
    setNfaStep(1);
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
          <Form.Root onValidationChange={setIsValid}>
            <Grid css={{ rowGap: '$4' }}>
              <AppNameField />
              <AppDescriptionField />
              <LogoField />
              <EnsDomainField />
            </Grid>
          </Form.Root>
          <Button
            disabled={!isValid}
            colorScheme="blue"
            variant="solid"
            onClick={handleNextStep}
          >
            Continue
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
