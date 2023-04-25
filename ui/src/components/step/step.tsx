import { Flex, Stepper } from '@/components';

import { StepStyles as S } from './step.styles';

type StepperIndicatorContainerProps = {
  children: React.ReactNode;
};

const StepperIndicatorContainer: React.FC<StepperIndicatorContainerProps> = ({
  children,
}: StepperIndicatorContainerProps) => {
  return (
    <Flex
      css={{
        flexDirection: 'column',
        justifyContent: 'center',
        // mr: '$34',
        maxWidth: '$106',
      }}
    >
      {children}
    </Flex>
  );
};

type StepProps = {
  children: React.ReactNode;
  header: string;
};

export const Step: React.FC<StepProps> = ({ children, header }: StepProps) => {
  return (
    <S.Container>
      <StepperIndicatorContainer>
        <Stepper.Indicator />
        <h2 className="text-4xl">{header}</h2>
      </StepperIndicatorContainer>
      {children}
    </S.Container>
  );
};
