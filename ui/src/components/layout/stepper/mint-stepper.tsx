import { Stepper } from './stepper';

export const MintStepper = () => (
  <Stepper.Root initialStep={1} totalSteps={4}>
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
  </Stepper.Root>
);
