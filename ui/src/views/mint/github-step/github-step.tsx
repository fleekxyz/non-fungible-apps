import { Stepper } from '@/components';
import { useState } from 'react';
import { Mint } from '../mint.context';
import { GithubConnect } from './github-connect-step';
import { GithubRepoConfiguration } from './github-repo-configuration';
import { GithubRepositoryConnection } from './github-repository-selection';

export const GithubStep = () => {
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
