import { Form, Step, Stepper } from '@/components';

import { WalletStep } from '../mint/wallet-step';
import { useAccessPointFormContext } from './ap-form-step/create-ap.form.context';
import { CreateAccessPointForm } from './ap-form-step/create-ap-form';
import { CreateAccessPointPreview } from './create-ap-preview';
import { CNAMEStep } from './cname-step/cname-step';

export const CreateApStepper: React.FC = () => {
  const {
    form: {
      isValid: [, setIsValid],
    },
  } = useAccessPointFormContext();

  return (
    <Stepper.Root initialStep={1}>
      <Form.Root onValidationChange={setIsValid}>
        <Stepper.Container>
          <Stepper.Step>
            <Step header="Connect your Ethereum Wallet to create Access Point">
              <WalletStep />
            </Step>
          </Stepper.Step>

          <Stepper.Step>
            <Step header="Enter the domain you  want to host the NFA">
              <CreateAccessPointForm />
            </Step>
          </Stepper.Step>

          <Stepper.Step>
            <Step header="Add a CNAME record to your DNS provider">
              <CNAMEStep />
            </Step>
          </Stepper.Step>

          <Stepper.Step>
            <Step header="Review your DyDx hosted frontend and confirm">
              <CreateAccessPointPreview />
            </Step>
          </Stepper.Step>
        </Stepper.Container>
      </Form.Root>
    </Stepper.Root>
  );
};
