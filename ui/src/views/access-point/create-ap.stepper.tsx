import { Stepper } from '@/components';
import { MintStep } from '../mint/mint-step';
import { WalletStep } from '../mint/wallet-step';
import { CreateAPForm } from './create-ap-form';
import { CreateAPPreview } from './create-ap-preview';

export const CreateApStepper = () => {
  return (
    <Stepper.Root initialStep={1}>
      <Stepper.Container>
        <Stepper.Step>
          <MintStep header="Connect your Ethereum Wallet to create Access Point">
            <WalletStep />
          </MintStep>
        </Stepper.Step>

        <Stepper.Step>
          <MintStep header="Set Access Point">
            <CreateAPForm />
          </MintStep>
        </Stepper.Step>

        <Stepper.Step>
          <MintStep header="Create Access Point">
            <CreateAPPreview />
          </MintStep>
        </Stepper.Step>
      </Stepper.Container>
    </Stepper.Root>
  );
};
