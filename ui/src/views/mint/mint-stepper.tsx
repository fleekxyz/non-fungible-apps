import { Stepper } from '@/components';

import { GithubStep } from './github-step';
import { MintStep } from './mint-step';
import { NFAStep } from './nfa-step';
import { MintPreview } from './preview-step/mint-preview';
import { WalletStep } from './wallet-step';

export const MintStepper = () => {
  return (
    <Stepper.Root initialStep={1}>
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
    </Stepper.Root>
  );
};
