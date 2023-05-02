import { CustomCardContainer } from '@/components';

import { RepoConfigurationBody } from './repo-configuration-body';
import { RepoConfigurationHeader } from './repo-configuration-header';

export const GithubRepoConfiguration: React.FC = () => {
  return (
    <CustomCardContainer css={{ minWidth: '17rem' }}>
      <RepoConfigurationHeader />
      <RepoConfigurationBody />
    </CustomCardContainer>
  );
};
