import { MintCardContainer } from '@/views/mint/mint-card';

import { RepoConfigurationBody } from './repo-configuration-body';
import { RepoConfigurationHeader } from './repo-configuration-header';

export const GithubRepoConfiguration: React.FC = () => {
  return (
    <MintCardContainer css={{ minWidth: '17rem' }}>
      <RepoConfigurationHeader />
      <RepoConfigurationBody />
    </MintCardContainer>
  );
};
