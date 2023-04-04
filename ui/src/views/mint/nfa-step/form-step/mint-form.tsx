import { useAccount } from 'wagmi';

import { Button, Card, Grid, Stepper } from '@/components';
import { AppLog } from '@/utils';

import { Mint } from '../../mint.context';
import { MintCardHeader } from '../../mint-card';
import {
  AppDescriptionField,
  AppNameField,
  EnsDomainField,
  LogoField,
} from './fields';
import { parseColorToNumber } from './form.utils';
import { useMintFormContext } from './mint-form.context';

export const MintFormStep: React.FC = () => {
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
      gitCommit: {
        value: [gitCommit],
      },
      gitBranch: {
        value: [gitBranch],
      },
      logoColor: {
        value: [logoColor],
      },
      isValid: [isValid],
    },
  } = useMintFormContext();
  const { address } = useAccount();
  const { nextStep } = Stepper.useContext();
  const { billing, repositoryName, verifyNFA, setNfaStep } = Mint.useContext();
  const { setArgs } = Mint.useTransactionContext();

  const handleNextStep = (): void => {
    if (!address) {
      AppLog.errorToast('No address found. Please connect your wallet.');
      return;
    }
    // setting the args otherwise mint may fail
    setArgs([
      address,
      appName,
      appDescription,
      domainURL,
      ens,
      gitCommit,
      `${repositoryName.url}/tree/${gitBranch}`,
      appLogo,
      parseColorToNumber(logoColor),
      verifyNFA,
      { value: billing },
    ]);

    nextStep();
  };

  const handlePrevStep = (): void => {
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
          <Grid css={{ rowGap: '$4' }}>
            <AppNameField />
            <AppDescriptionField />
            <LogoField />
            <EnsDomainField />
          </Grid>
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
