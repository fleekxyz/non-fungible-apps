import { Mint } from '../mint.context';
import { MintFormStep } from './form-step';
import { VerifyNFAStep } from './verify-step';

export const NFAStep = () => {
  const { nfaStep } = Mint.useContext();

  switch (nfaStep) {
    default:
    case 1:
      return <VerifyNFAStep />;
    case 2:
      return <MintFormStep />;
  }
};
