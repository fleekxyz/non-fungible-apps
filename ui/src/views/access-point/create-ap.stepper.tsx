import { Step, Stepper } from '@/components';
import { WalletStep } from '../mint/wallet-step';
import { CreateAccessPointForm } from './create-ap-form';
import { CreateAccessPointPreview } from './create-ap-preview';

export const CreateApStepper = () => {
  return (
    <Stepper.Root initialStep={1}>
      <Stepper.Container>
        <Stepper.Step>
          <Step header="Connect your Ethereum Wallet to create Access Point">
            <WalletStep />
          </Step>
        </Stepper.Step>

        <Stepper.Step>
          <Step header="Set Access Point">
            <CreateAccessPointForm />
          </Step>
        </Stepper.Step>

        <Stepper.Step>
          <Step header="Create Access Point">
            <CreateAccessPointPreview />
          </Step>
        </Stepper.Step>
      </Stepper.Container>
    </Stepper.Root>
  );
};
