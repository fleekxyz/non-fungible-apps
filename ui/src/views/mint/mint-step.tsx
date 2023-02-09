import { Flex, Stepper } from '@/components';

type StepperIndicatorContainerProps = {
  children: React.ReactNode;
};

const StepperIndicatorContainer = ({
  children,
}: StepperIndicatorContainerProps) => {
  return (
    <Flex
      css={{
        flexDirection: 'column',
        justifyContent: 'center',
        mr: '$34',
        width: '$106',
      }}
    >
      {children}
    </Flex>
  );
};

type MintStepContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: MintStepContainerProps) => (
  <Flex css={{ flexDirection: 'row', justifyContent: 'center' }}>
    {children}
  </Flex>
);

type MintStepProps = {
  children: React.ReactNode;
  header: string;
};

export const MintStep: React.FC<MintStepProps> = ({ children, header }) => {
  return (
    <Container>
      <StepperIndicatorContainer>
        <Stepper.Indicator />
        <h2 className="text-4xl">{header}</h2>
      </StepperIndicatorContainer>
      {children}
    </Container>
  );
};
