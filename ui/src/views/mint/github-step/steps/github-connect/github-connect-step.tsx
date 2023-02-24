import { Card, Grid, Icon, IconButton } from '@/components';
import { GithubButton } from './github-button';

export const GithubConnect: React.FC = () => (
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
        <GithubButton />
        <Card.Text
          css={{ height: '$46h', width: '$95', fontSize: '$md', px: '$12' }}
        >
          <span>
            After connecting your GitHub, your repositories will show here.
          </span>
        </Card.Text>
      </Grid>
    </Card.Body>
  </Card.Container>
);
