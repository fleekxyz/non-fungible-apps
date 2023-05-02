import {
  Button,
  Card,
  CustomCardContainer,
  CustomCardHeader,
  Stepper,
  Switch,
  Text,
} from '@/components';

import { Mint } from '../../mint.context';
import { useMintFormContext } from '../form-step';
import { VerifyNfaStepStyles as S } from './verify-nfa-step.styles';

export const VerifyNFAStep: React.FC = () => {
  const { prevStep } = Stepper.useContext();
  const { verifyNFA, setVerifyNFA, setNfaStep } = Mint.useContext();
  const {
    form: {
      verifier: {
        value: [verifier],
      },
    },
  } = useMintFormContext();

  const handleNextStep = (): void => {
    setNfaStep(2);
  };

  return (
    <CustomCardContainer>
      <CustomCardHeader.Default title="Verify NFA" onClickBack={prevStep} />
      <Card.Body>
        <S.Body.Container>
          <S.Body.Text>
            Below you can allow Fleek to be added as a controller to your NFA.
            This will allow Fleek to automatically verify your NFA and update
            builds and other metadata. It will not allow Fleek to transfer or
            burn your NFT. You can change this setting later on your NFA but
            adding it now will save you a transaction in the future. We
            recommend it so that your users can get verified NFAs.
          </S.Body.Text>
          <S.Body.VerifyContainer>
            <Text css={{ color: '$slate12' }}>Verify NFA</Text>
            <Switch checked={verifyNFA} onChange={setVerifyNFA} />
          </S.Body.VerifyContainer>
          <SelectVerifier />
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={handleNextStep}
            disabled={!verifier}
          >
            Continue
          </Button>
        </S.Body.Container>
      </Card.Body>
    </CustomCardContainer>
  );
};
