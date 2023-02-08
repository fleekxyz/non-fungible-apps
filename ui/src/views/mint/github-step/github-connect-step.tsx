import { Button, Card, Grid, Icon, IconButton } from '@/components';
import { Mint } from '../mint.context';

export const GithubConnect: React.FC = () => {
  const { setGithubStep } = Mint.useContext();

  const handleNextStep = () => {
    //TODO when we integrate GH login, we'll need to set the step to 2 after login
    setGithubStep(2);
  };
  return (
    <Card.Container>
      <Card.Heading
        title="Connect GitHub"
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
            iconSpacing="59"
            size="lg"
            variant="ghost"
            css={{
              backgroundColor: '$slate4',
              color: '$slate12',
              py: '$2h',
            }}
            onClick={handleNextStep}
            rightIcon={
              <Icon name="github" css={{ color: 'white', fontSize: '$4xl' }} />
            }
          >
            GitHub
          </Button>
          <Card.Text css={{ height: '$46h', width: '$95', px: '$12' }}>
            <span>
              After connecting your GitHub, your repositories will show here.
            </span>
          </Card.Text>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
