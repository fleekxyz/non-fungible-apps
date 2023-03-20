import { useState } from 'react';

import { ComboboxItem } from '@/components';
import { EthereumHooks } from '@/integrations';
import { AppLog, createContext } from '@/utils';
import { GithubState, useFleekERC721Billing } from '@/store';

export type MintContext = {
  billing: string | undefined;
  selectedUserOrg: string;
  repositoryName: GithubState.Repository;
  repositoryOwner: string;
  branchName: ComboboxItem; //get value from DropdownItem to mint
  commitHash: string;
  githubStep: number;
  nfaStep: number;
  logoColor: string;
  verifyNFA: boolean;
  setGithubStep: (step: number) => void;
  setNfaStep: (step: number) => void;
  setSelectedUserOrg: (userOrgValue: string) => void;
  setRepositoryName: (repo: GithubState.Repository) => void;
  setRepositoryOwner: (owner: string) => void;
  setBranchName: (branch: ComboboxItem) => void;
  setCommitHash: (hash: string) => void;
  setLogoColor: (color: string) => void;
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
    const [selectedUserOrg, setSelectedUserOrg] = useState('');
    const [repositoryName, setRepositoryName] =
      useState<GithubState.Repository>({} as GithubState.Repository);
    const [repositoryOwner, setRepositoryOwner] = useState('');
    const [branchName, setBranchName] = useState({} as ComboboxItem);
    const [commitHash, setCommitHash] = useState('');
    const [githubStep, setGithubStepContext] = useState(1);

    //NFA Details
    const [nfaStep, setNfaStep] = useState(1);
    const [logoColor, setLogoColor] = useState('');
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
          repositoryOwner,
          branchName,
          commitHash,
          githubStep,
          nfaStep,
          logoColor,
          verifyNFA,
          setSelectedUserOrg,
          setGithubStep,
          setNfaStep,
          setRepositoryName,
          setRepositoryOwner,
          setBranchName,
          setCommitHash,
          setLogoColor,
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
