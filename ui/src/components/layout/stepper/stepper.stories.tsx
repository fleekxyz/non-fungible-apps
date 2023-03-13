import { Button } from '../../core';
import { Flex } from '../../layout';
import { Stepper } from './stepper';

export default {
  title: 'Components/Layout/Stepper',
  component: Stepper,
};

const StepperButton: React.FC = () => {
  const { nextStep, prevStep, setStep } = Stepper.useContext();
  return (
    <Flex css={{ gap: '$md' }}>
      <Button onClick={prevStep}>Prev</Button>
      <Button onClick={nextStep}>Next</Button>
      <Button onClick={() => setStep(4)}>Set final step</Button>
    </Flex>
  );
};

export const Default = () => {
  return (
    <>
      <Stepper.Root initialStep={1}>
        <Stepper.Container>
          <Stepper.Step>
            {/* Step 1 */}
            <Stepper.Indicator />
          </Stepper.Step>
          <Stepper.Step>
            {/* Step 2*/}
            <Stepper.Indicator />
          </Stepper.Step>
          <Stepper.Step>
            {/* Step 3 */}
            <Stepper.Indicator />
          </Stepper.Step>
          <Stepper.Step>
            {/* Step 4 */}
            <Stepper.Indicator />
          </Stepper.Step>
        </Stepper.Container>

        <StepperButton />
      </Stepper.Root>
    </>
  );
};
