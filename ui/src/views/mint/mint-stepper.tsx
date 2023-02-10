import { IconButton, Icon, Stepper, Card } from '@/components';
import { GithubStep } from './github-step';
import { MintStep } from './mint-step';
import { Mint } from './mint.context';

//TODO remove after mint flow is done
const Heading = ({ title }: { title: string }) => {
  const { prevStep } = Stepper.useContext();

  return (
    <Card.Heading
      title={title}
      leftIcon={
        <IconButton
          aria-label="Add"
          colorScheme="gray"
          variant="link"
          icon={<Icon name="back" />}
          css={{ mr: '$2' }}
          onClick={prevStep}
        />
      }
      rightIcon={
        <IconButton
          aria-label="Add"
          colorScheme="gray"
          variant="link"
          icon={<Icon name="info" />}
        />
      }
    />
  );
};

export const MintStepper = () => {
  return (
    <Stepper.Root initialStep={1}>
      <Mint.Provider>
        <Stepper.Container>
          <Stepper.Step>
            <MintStep header="Connect GitHub and select repository">
              <GithubStep />
            </MintStep>
          </Stepper.Step>

          <Stepper.Step>
            <MintStep header="Connect your Ethereum Wallet to mint an NFA">
              <Card.Container>
                <Heading title="Connect Wallet" />
                <Card.Body>
                  <span>Step 2</span>
                </Card.Body>
              </Card.Container>
            </MintStep>
          </Stepper.Step>

          <Stepper.Step>
            <MintStep header="Finalize a few key things for your DyDx NFA">
              <Card.Container>
                <Heading title="NFA Detail" />
                <Card.Body>
                  <span>Step 3</span>
                </Card.Body>
              </Card.Container>
            </MintStep>
          </Stepper.Step>

          <Stepper.Step>
            <MintStep header="Review your DyDx NFA and mint it on Polygon">
              <Card.Container>
                <Heading title="Mint NFA" />
                <Card.Body>
                  <span>Step 4</span>
                </Card.Body>
              </Card.Container>
            </MintStep>
          </Stepper.Step>
        </Stepper.Container>
      </Mint.Provider>

      {/* TODO remove buttons when finish to integrate all the flow */}
      {/* <StepperButton /> */}
    </Stepper.Root>
  );
};
