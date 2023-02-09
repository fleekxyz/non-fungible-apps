import { createContext } from '@/utils';
import { useState } from 'react';

export type MintContext = {
  repositoryName: string;
  branchName: string;
  commitHash: string;
  githubStep: number;
  setGithubStep: (step: number) => void;
  setRepositoryName: (repo: string) => void;
  setRepositoryConfig: (branch: string, hash: string) => void;
};

const [MintProvider, useContext] = createContext<MintContext>({
  name: 'Mint.Context',
  hookName: 'Mint.useContext',
  providerName: 'Mint.Provider',
});

export abstract class Mint {
  static readonly useContext = useContext;

  static readonly Provider: React.FC<Mint.ProviderProps> = ({ children }) => {
    const [repositoryName, setRepositoryName] = useState('');
    const [branchName, setBranchName] = useState('');
    const [commitHash, setCommitHash] = useState('');
    const [githubStep, setGithubStepContext] = useState(1);

    const setGithubStep = (step: number): void => {
      if (step > 0 && step <= 3) {
        setGithubStepContext(step);
      }
    };

    const setRepositoryConfig = (branch: string, hash: string) => {
      setBranchName(branch);
      setCommitHash(hash);
    };

    return (
      <MintProvider
        value={{
          repositoryName,
          branchName,
          commitHash,
          githubStep,
          setGithubStep,
          setRepositoryConfig,
          setRepositoryName,
        }}
      >
        {children}
      </MintProvider>
    );
  };
}

export namespace Mint {
  export type ProviderProps = {
    children: React.ReactNode;
  };
}
