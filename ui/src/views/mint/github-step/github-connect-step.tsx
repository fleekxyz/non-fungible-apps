import { Button, Card, Grid, Icon, IconButton } from '@/components';

type GithubConnectProps = {
  nextStep: () => void;
};
export const GithubConnect: React.FC<GithubConnectProps> = ({ nextStep }) => (
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
          //   TODO replace for
          onClick={nextStep}
          rightIcon={
            <Icon name="github" css={{ color: 'white', fontSize: '$4xl' }} />
          }
        >
          GitHub
        </Button>
        <Card.CardText css={{ height: '$46h', width: '$95', px: '$12' }}>
          <span>
            After connecting your GitHub, your repositories will show here.
          </span>
        </Card.CardText>
      </Grid>
    </Card.Body>
  </Card.Container>
);
