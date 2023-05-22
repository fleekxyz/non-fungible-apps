import { useAccount } from 'wagmi';

import {
  Button,
  Card,
  CustomCardContainer,
  CustomCardHeader,
  Flex,
  Stepper,
} from '@/components';
import { AppLog } from '@/utils';
import { parseColorToNumber } from '@/utils/color';

import { Mint } from '../../mint.context';
import {
  AppDescriptionField,
  AppNameField,
  EnsDomainField,
  IPFSHashField,
  LogoField,
} from './fields';
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
      ipfsHash: {
        value: [ipfsHash],
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

    setArgs([
      address,
      appName,
      appDescription,
      domainURL,
      ens,
      gitCommit,
      `${repositoryName?.url}/tree/${gitBranch}`,
      ipfsHash,
      appLogo,
      parseColorToNumber(logoColor),
      verifyNFA,
      '0xdBb04e00D5ec8C9e3aeF811D315Ee7C147c5DBFD', //TODO remove hardcode
      { value: billing },
    ]);

    nextStep();
  };

  const handlePrevStep = (): void => {
    setNfaStep(1);
  };

  return (
    <CustomCardContainer>
      <CustomCardHeader.Default
        title="NFA Details"
        onClickBack={handlePrevStep}
      />
      <Card.Body>
        <Flex
          css={{
            gap: '$6',
            flexDirection: 'column',
          }}
        >
          <Flex css={{ gap: '$4', flexDirection: 'column' }}>
            <AppNameField />
            <AppDescriptionField />
            <IPFSHashField />
            <EnsDomainField />
            <LogoField />
          </Flex>
          <Button
            disabled={!isValid}
            colorScheme="blue"
            variant="solid"
            onClick={handleNextStep}
          >
            Continue
          </Button>
        </Flex>
      </Card.Body>
    </CustomCardContainer>
  );
};
