import { useState } from 'react';

import { EthereumHooks } from '@/integrations';
import { GithubClient, GithubState, useFleekERC721Billing } from '@/store';
import { AppLog, createContext } from '@/utils';

export type MintContext = {
  billing: string | undefined;
  selectedUserOrg: GithubClient.UserData | undefined;
  repositoryName: GithubState.Repository | undefined;
  githubStep: number;
  nfaStep: number;
  verifyNFA: boolean;
  setGithubStep: (step: number) => void;
  setNfaStep: (step: number) => void;
  setSelectedUserOrg: (userOrgValue: GithubClient.UserData | undefined) => void;
  setRepositoryName: (repo: GithubState.Repository | undefined) => void;
  setVerifyNFA: (verify: boolean) => void;
};

const [MintProvider, useContext] = createContext<MintContext>({
  name: 'Mint.Context',
  hookName: 'Mint.useContext',
  providerName: 'Mint.Provider',
});

const [TransactionProvider, useTransactionContext] =
  EthereumHooks.createFleekERC721WriteContext('mint');

export abstract class Mint {
  static readonly useContext = useContext;

  static readonly useTransactionContext = useTransactionContext;

  static readonly Provider: React.FC<Mint.ProviderProps> = ({ children }) => {
    //Github Connection
    const [selectedUserOrg, setSelectedUserOrg] =
      useState<GithubClient.UserData>();
    const [repositoryName, setRepositoryName] =
      useState<GithubState.Repository>();
    const [githubStep, setGithubStepContext] = useState(1);

    //NFA Details
    const [nfaStep, setNfaStep] = useState(1);
    const [verifyNFA, setVerifyNFA] = useState(true);
    const [billing] = useFleekERC721Billing('Mint');

    const setGithubStep = (step: number): void => {
      if (step > 0 && step <= 3) {
        setGithubStepContext(step);
      }
    };

    return (
      <MintProvider
        value={{
          billing,
          selectedUserOrg,
          repositoryName,
          githubStep,
          nfaStep,
          verifyNFA,
          setSelectedUserOrg,
          setGithubStep,
          setNfaStep,
          setRepositoryName,
          setVerifyNFA,
        }}
      >
        <TransactionProvider
          config={{
            transaction: {
              onSuccess: (data) => {
                AppLog.info('Transaction:', data);
              },
              onError: (error) => {
                AppLog.errorToast(error.message);
              },
            },
          }}
        >
          {children}
        </TransactionProvider>
      </MintProvider>
    );
  };
}

export namespace Mint {
  export type ProviderProps = {
    children: React.ReactNode;
  };
}
