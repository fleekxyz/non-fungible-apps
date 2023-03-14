import { useState } from 'react';

import { ComboboxItem, DropdownItem } from '@/components';
import { EthereumHooks } from '@/integrations';
import { AppLog, createContext } from '@/utils';
import { GithubState, useFleekERC721Billing } from '@/store';

export type MintContext = {
  billing: string | undefined;
  selectedUserOrg: ComboboxItem;
  repositoryName: GithubState.Repository;
  branchName: DropdownItem; //get value from DropdownItem to mint
  commitHash: string;
  githubStep: number;
  nfaStep: number;
  appName: string;
  appDescription: string;
  appLogo: string;
  logoColor: string;
  ens: ComboboxItem;
  domain: string;
  verifyNFA: boolean;
  ensError: string;
  setGithubStep: (step: number) => void;
  setNfaStep: (step: number) => void;
  setSelectedUserOrg: (userOrg: ComboboxItem) => void;
  setRepositoryName: (repo: GithubState.Repository) => void;
  setBranchName: (branch: DropdownItem) => void;
  setCommitHash: (hash: string) => void;
  setAppName: (name: string) => void;
  setAppDescription: (description: string) => void;
  setAppLogo: (logo: string) => void;
  setLogoColor: (color: string) => void;
  setEns: (ens: ComboboxItem) => void;
  setDomain: (domain: string) => void;
  setVerifyNFA: (verify: boolean) => void;
  setEnsError: (error: string) => void;
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
    const [selectedUserOrg, setSelectedUserOrg] = useState({} as ComboboxItem);
    const [repositoryName, setRepositoryName] =
      useState<GithubState.Repository>({} as GithubState.Repository);
    const [branchName, setBranchName] = useState({} as DropdownItem);
    const [commitHash, setCommitHash] = useState('');
    const [githubStep, setGithubStepContext] = useState(1);

    //NFA Details
    const [nfaStep, setNfaStep] = useState(1);
    const [appName, setAppName] = useState('');
    const [appDescription, setAppDescription] = useState('');
    const [appLogo, setAppLogo] = useState('');
    const [logoColor, setLogoColor] = useState('');
    const [ens, setEns] = useState({} as ComboboxItem);
    const [domain, setDomain] = useState('');
    const [verifyNFA, setVerifyNFA] = useState(true);
    const [billing] = useFleekERC721Billing('Mint');

    //Field validations
    const [ensError, setEnsError] = useState<string>('');

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
          branchName,
          commitHash,
          githubStep,
          nfaStep,
          appName,
          appDescription,
          appLogo,
          logoColor,
          ens,
          domain,
          verifyNFA,
          ensError,
          setSelectedUserOrg,
          setGithubStep,
          setNfaStep,
          setRepositoryName,
          setBranchName,
          setCommitHash,
          setAppName,
          setAppDescription,
          setAppLogo,
          setLogoColor,
          setEns,
          setDomain,
          setVerifyNFA,
          setEnsError,
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
