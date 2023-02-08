import { Stepper } from '@/components';
import { useState } from 'react';
import { GithubConnect } from './github-connect-step';
import { GithubRepoConfiguration } from './github-repo-configuration';
import { GithubRepositoryConnection } from './github-repository-selection';

export const GithubStep = () => {
  const { nextStep } = Stepper.useContext();
  const [step, setStep] = useState(1);
  const [repoSelected, setRepoSelected] = useState('');
  //TODO add context or redux to store which GH stpe is active
  switch (step) {
    case 1:
    default:
      return (
        <GithubConnect nextStep={() => setStep((prevState) => prevState + 1)} />
      );
    case 2:
      return (
        <GithubRepositoryConnection
          prevStep={() => setStep((prevState) => prevState - 1)}
          setRepo={(repo: string) => {
            setStep((prevState) => prevState + 1);
            setRepoSelected(repo);
          }}
        />
      );
    case 3:
      return (
        <GithubRepoConfiguration
          prevStep={() => setStep((prevState) => prevState - 1)}
          nextStep={nextStep}
          repoSelected={repoSelected}
        />
      );
  }
};
