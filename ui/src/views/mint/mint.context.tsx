import { ComboboxItem, DropdownItem } from '@/components';
import { GithubState } from '@/store';
import { EthereumHooks } from '@/integrations';
import { createContext } from '@/utils';
import { useState } from 'react';

export type MintContext = {
  selectedUserOrg: ComboboxItem;
  repositoryName: GithubState.Repository;
  branchName: DropdownItem; //get value from DropdownItem to mint
  commitHash: string;
  githubStep: number;
  appName: string;
  appDescription: string;
  appLogo: string;
  logoColor: string;
  ens: ComboboxItem;
  domain: string;
  verifyNFA: boolean;
  ensError: string;
  setGithubStep: (step: number) => void;
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
    const [appName, setAppName] = useState('');
    const [appDescription, setAppDescription] = useState('');
    const [appLogo, setAppLogo] = useState('');
    const [logoColor, setLogoColor] = useState('');
    const [ens, setEns] = useState({} as ComboboxItem);
    const [domain, setDomain] = useState('');
    const [verifyNFA, setVerifyNFA] = useState(true);

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
          selectedUserOrg,
          repositoryName,
          branchName,
          commitHash,
          githubStep,
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
                console.log('Successfully minted! what now?', data);
                alert('transaction hash: ' + data.transactionHash);
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
