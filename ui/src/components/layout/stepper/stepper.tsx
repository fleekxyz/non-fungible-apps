import { Flex } from '@/components';
import React, { useMemo, useState } from 'react';
import { createContext } from '../../../utils';
import { StepperStyles } from './stepper.styles';

export type SelectContext = {
  totalSteps: number;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
};

const [Provider, useContext] = createContext<SelectContext>({
  name: 'Stepper.Context',
  hookName: 'Stepper.useContext',
  providerName: 'Stepper.Provider',
});

const getStepsLength = (node: React.ReactNode): number => {
  let length = 0;

  React.Children.forEach(node, (child) => {
    if (React.isValidElement(child)) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (child.type === Stepper.Step) length += 1;
      else length += getStepsLength(child.props.children);
    }
  });

  return length;
};

export abstract class Stepper {
  static readonly useContext = useContext;

  static readonly Root: React.FC<Stepper.RootProps> = ({
    children,
    initialStep = 0,
  }) => {
    const [currentStep, setCurrentStep] = useState(initialStep - 1);
    const totalSteps = useMemo(() => getStepsLength(children), [children]);

    const nextStep = (): void => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    };

    const prevStep = (): void => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };

    const setStep = (step: number): void => {
      if (step > 0 && step <= totalSteps) {
        setCurrentStep(step - 1);
      }
    };

    return (
      <Provider
        value={{ totalSteps, currentStep, nextStep, prevStep, setStep }}
      >
        {children}
      </Provider>
    );
  };

  static readonly Container = (props: Stepper.ContainerProps): JSX.Element => {
    const { children } = props;
    const { currentStep } = this.useContext();

    const filteredChildren = useMemo(
      () =>
        React.Children.toArray(children).map((child, index) => {
          if (!React.isValidElement(child)) {
            throw new Error(
              'Stepper.Container children must be a valid React element'
            );
          }

          if (child.type !== Stepper.Step) {
            throw new Error(
              'Stepper.Container children must be a Stepper.Step component'
            );
          }

          if (index === currentStep) {
            return child;
          }

          return null;
        }),
      [children, currentStep]
    );

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{filteredChildren}</>;
  };

  static readonly Step = ({
    children,
  }: // eslint-disable-next-line react/jsx-no-useless-fragment
  Stepper.StepProps): JSX.Element => <>{children}</>;

  static readonly Indicator: React.FC<Stepper.IndicatorProps> = (props) => {
    const { currentStep, totalSteps } = this.useContext();
    const steps = Array.from(Array(totalSteps).keys());

    return (
      <Flex css={{ flexDirection: 'column' }}>
        <StepperStyles.Rail {...props}>
          {steps.map((step) => (
            <StepperStyles.RailDivision
              key={step}
              data-active={step <= currentStep}
            />
          ))}
        </StepperStyles.Rail>
        <StepperStyles.RailDivisionLabel>
          Step {currentStep + 1}
        </StepperStyles.RailDivisionLabel>
      </Flex>
    );
  };
}

export namespace Stepper {
  export type RootProps = {
    children: React.ReactNode;
    initialStep?: number;
  };

  export type StepIndex = string | number;

  export type ContainerProps = {
    children: React.ReactNode | React.ReactNode[];
  };

  export type StepProps = {
    children: React.ReactNode;
  };

  export type IndicatorProps = React.ComponentProps<typeof StepperStyles.Rail>;
}
