import { Card } from '@/components';
import { RepoConfigurationBody } from './repo-configuration-body';
import { RepoConfigurationHeader } from './repo-configuration-header';

export const GithubRepoConfiguration: React.FC = () => {
  return (
    <Card.Container css={{ width: '$107h' }}>
      <RepoConfigurationHeader />
      <RepoConfigurationBody />
    </Card.Container>
  );
};
