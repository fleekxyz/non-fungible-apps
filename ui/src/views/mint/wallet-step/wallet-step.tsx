import { Button, Card, Grid, Icon, IconButton, Stepper } from '@/components';

export const WalletStep = () => {
  const { prevStep, nextStep } = Stepper.useContext();
  return (
    <Card.Container>
      <Card.Heading
        title="Connect GitHub"
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
      <Card.Body>
        <Grid css={{ rowGap: '$6' }}>
          <Button
            iconSpacing="52"
            size="lg"
            variant="ghost"
            css={{
              backgroundColor: '$slate4',
              color: '$slate12',
              py: '$2h',
            }}
            onClick={nextStep}
            rightIcon={
              <Icon
                name="metamask"
                css={{ color: 'white', fontSize: '$4xl' }}
              />
            }
          >
            Metamask
          </Button>
          <Card.Text
            css={{ height: '$46h', width: '$95', fontSize: '$md', px: '$12' }}
          >
            <span>Connect with the wallet you want to mint & own the NFA.</span>
          </Card.Text>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
