import { Flex, IconButton, Icon, Stepper } from '@/components';
import { GithubStep } from './github-step';
import { Mint } from './mint.context';

const CardHeading = ({ title }: { title: string }) => {
  const { currentStep, prevStep } = Stepper.useContext();
  return (
    <Flex css={{ justifyContent: 'space-between' }}>
      <Flex>
        {currentStep > 0 && (
          <IconButton
            aria-label="Add"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="back" />}
            onClick={prevStep}
            css={{ mr: '$2' }}
          />
        )}

        <h3 style={{ fontSize: '20px', fontWeight: '700' }}>{title}</h3>
      </Flex>
      <IconButton
        aria-label="Add"
        colorScheme="gray"
        variant="link"
        icon={<Icon name="info" />}
      />
    </Flex>
  );
};

type CardProps = {
  children: React.ReactNode;
  title: string;
};

// TODO create card component for all the project and then remove this
const Card = ({ children, title }: CardProps) => {
  // TODO style with stitches
  const { repositoryName, branchName, commitHash } = Mint.useContext();
  console.log(repositoryName, branchName, commitHash);
  return (
    <div
      style={{
        width: '424px',
        backgroundColor: '#1A1D1E',
        borderStyle: 'solid',
        borderColor: '#313538',
        borderRadius: '20px',
        padding: '28px',
        minHeight: '378px',
      }}
    >
      <CardHeading title={title} />
      {children}
    </div>
  );
};

const Heading = ({ children }: { children: React.ReactNode }) => (
  // TODO style with stitches or we can use tailwind
  <h2 className="text-4xl">{children}</h2>
);

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

const MintStepContainer = ({ children }: MintStepContainerProps) => (
  <Flex css={{ flexDirection: 'row', justifyContent: 'center' }}>
    {children}
  </Flex>
);

export const MintStepper = () => {
  return (
    <Stepper.Root initialStep={1}>
      <Mint.Provider>
        <Stepper.Container>
          <Stepper.Step>
            <MintStepContainer>
              <StepperIndicatorContainer>
                <Stepper.Indicator />
                <Heading>Connect GitHub and select repository</Heading>
              </StepperIndicatorContainer>
              {/* TODO create component to handle the github connection */}
              <GithubStep />
            </MintStepContainer>
          </Stepper.Step>
          <Stepper.Step>
            <MintStepContainer>
              <StepperIndicatorContainer>
                <Stepper.Indicator />
                <Heading>Connect your Ethereum Wallet to mint an NFA</Heading>
              </StepperIndicatorContainer>
              {/* TODO create component to handle the wallet connection */}
              <Card title="Get Started">
                <span>Step 1</span>
              </Card>
            </MintStepContainer>
          </Stepper.Step>
          <Stepper.Step>
            <MintStepContainer>
              <StepperIndicatorContainer>
                <Stepper.Indicator />
                <Heading>Finalize a few key things for your DyDx NFA</Heading>
              </StepperIndicatorContainer>
              {/* TODO create component to handle the NFA details */}
              <Card title="NFA Details">
                <span>Step 3</span>
              </Card>
            </MintStepContainer>
          </Stepper.Step>
          <Stepper.Step>
            <MintStepContainer>
              <StepperIndicatorContainer>
                <Stepper.Indicator />
                <Heading>Review your DyDx NFA and mint it on Polygon</Heading>
              </StepperIndicatorContainer>
              {/* TODO create component to handle the NFA mint */}
              <Card title="Mint NFA">
                <span>Step 4</span>
              </Card>
            </MintStepContainer>
          </Stepper.Step>
        </Stepper.Container>
      </Mint.Provider>

      {/* TODO remove buttons when finish to integrate all the flow */}
      {/* <StepperButton /> */}
    </Stepper.Root>
  );
};
