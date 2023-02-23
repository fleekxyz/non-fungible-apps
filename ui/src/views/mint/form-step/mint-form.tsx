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
import { parseColorToNumber } from './form.utils';

export const FormStep = () => {
  const { address } = useAccount();
  const { prevStep, nextStep } = Stepper.useContext();
  const {
    appName,
    appDescription,
    domain,
    appLogo,
    branchName,
    commitHash,
    ens,
    logoColor,
    repositoryName,
    verifyNFA,
  } = Mint.useContext();
  const { setArgs } = Mint.useTransactionContext();

  const handleNextStep = () => {
    if (!address) return console.log('No address was found');
    // TODO: we need to make sure all values are correct before
    // setting the args otherwise mint may fail
    setArgs([
      address,
      appName,
      appDescription,
      domain,
      ens.value,
      commitHash,
      `${repositoryName}/${branchName.value}`,
      appLogo,
      parseColorToNumber(logoColor),
      verifyNFA,
    ]);

    nextStep();
  };

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
            onClick={handleNextStep}
          >
            Continue
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
