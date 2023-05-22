import { Form, Step, Stepper } from '@/components';

import { WalletStep } from '../mint/wallet-step';
import { CreateAccessPointForm } from './ap-form-step/create-ap-form';
import { APRecordStep } from './ap-record-step/ap-record-step';
import { isSubdomain } from './ap-record-step/record-step.utils';
import { CreateAccessPoint } from './create-ap.context';
import { CreateAccessPointPreview } from './create-ap-preview';
import { CreateAccessPointSuccess } from './create-ap-success';

export const CreateApStepper: React.FC = () => {
  const {
    transaction: { isSuccess },
  } = CreateAccessPoint.useTransactionContext();

  const {
    form: {
      domain: {
        value: [accesPointDomain],
      },
      isValid: [, setIsValid],
    },
  } = CreateAccessPoint.useFormContext();

  if (isSuccess) return <CreateAccessPointSuccess />;

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
            <Step
              header={`Add a ${
                isSubdomain(accesPointDomain) ? 'CNAME' : 'ANAME'
              } record to your DNS provider`}
            >
              <APRecordStep />
            </Step>
          </Stepper.Step>

          <Stepper.Step>
            <Step header="Review your hosted frontend and confirm">
              <CreateAccessPointPreview />
            </Step>
          </Stepper.Step>
        </Stepper.Container>
      </Form.Root>
    </Stepper.Root>
  );
};
