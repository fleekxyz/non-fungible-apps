import { Card } from '@/components';

import { RepoConfigurationBody } from './repo-configuration-body';
import { RepoConfigurationHeader } from './repo-configuration-header';

export const GithubRepoConfiguration: React.FC = () => {
  return (
    <Card.Container css={{ minWidth: '17rem', maxWidth: '$107h' }}>
      <RepoConfigurationHeader />
      <RepoConfigurationBody />
    </Card.Container>
  );
};
