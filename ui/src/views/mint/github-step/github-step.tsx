import { Mint } from '../mint.context';
import {
  GithubConnect,
  GithubRepoConfiguration,
  GithubRepositoryConnection,
} from './steps';

export const GithubStep: React.FC = () => {
  const { githubStep } = Mint.useContext();

  switch (githubStep) {
    case 1:
    default:
      return <GithubConnect />;
    case 2:
      return <GithubRepositoryConnection />;
    case 3:
      return <GithubRepoConfiguration />;
  }
};
