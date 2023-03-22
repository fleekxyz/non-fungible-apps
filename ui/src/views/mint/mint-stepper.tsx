import { Form, Stepper } from '@/components';
import { MintPreview } from './preview-step/mint-preview';
import { GithubStep } from './github-step';
import { MintStep } from './mint-step';
import { WalletStep } from './wallet-step';
import { NFAStep } from './nfa-step';
import { Mint } from './mint.context';
import { NftMinted } from './nft-minted';
import { useMintFormContext } from './nfa-step/form-step';

export const MintStepper = () => {
  const {
    transaction: { isSuccess },
  } = Mint.useTransactionContext();
  const {
    form: {
      isValid: [, setIsValid],
    },
  } = useMintFormContext();

  if (!isSuccess) {
    return (
      <Stepper.Root initialStep={1}>
        <Form.Root onValidationChange={setIsValid}>
          <Stepper.Container>
            <Stepper.Step>
              <MintStep header="Connect your Ethereum Wallet to mint an NFA">
                <WalletStep />
              </MintStep>
            </Stepper.Step>

            <Stepper.Step>
              <MintStep header="Connect GitHub and select repository">
                <GithubStep />
              </MintStep>
            </Stepper.Step>

            <Stepper.Step>
              <MintStep header="Finalize a few key things for your NFA">
                <NFAStep />
              </MintStep>
            </Stepper.Step>

            <Stepper.Step>
              <MintStep header="Review your NFA and mint it on Polygon">
                <MintPreview />
              </MintStep>
            </Stepper.Step>
          </Stepper.Container>
        </Form.Root>
      </Stepper.Root>
    );
  } else {
    return <NftMinted />;
  }
};
