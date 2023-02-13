import { DropdownItem } from '@/components';
import { createContext } from '@/utils';
import { useState } from 'react';

export type MintContext = {
  repositoryName: string;
  branchName: DropdownItem; //get value from DropdownItem to mint
  commitHash: string;
  githubStep: number;
  appName: string;
  appDescription: string;
  appLogo: string;
  logoColor: string;
  ens: DropdownItem; //maybe it would be a DropdownItem
  domain: string;
  verifyNFA: boolean;
  sucessMint: boolean | undefined;
  setGithubStep: (step: number) => void;
  setRepositoryName: (repo: string) => void;
  setRepositoryConfig: (branch: DropdownItem, hash: string) => void;
  setAppName: (name: string) => void;
  setAppDescription: (description: string) => void;
  setAppLogo: (logo: string) => void;
  setLogoColor: (color: string) => void;
  setEns: (ens: DropdownItem) => void;
  setDomain: (domain: string) => void;
  setVerifyNFA: (verify: boolean) => void;
  setSucessMint: (sucess: boolean) => void;
};

const [MintProvider, useContext] = createContext<MintContext>({
  name: 'Mint.Context',
  hookName: 'Mint.useContext',
  providerName: 'Mint.Provider',
});

export abstract class Mint {
  static readonly useContext = useContext;

  static readonly Provider: React.FC<Mint.ProviderProps> = ({ children }) => {
    //Github Connection
    const [repositoryName, setRepositoryName] = useState('');
    const [branchName, setBranchName] = useState({} as DropdownItem);
    const [commitHash, setCommitHash] = useState('');
    const [githubStep, setGithubStepContext] = useState(1);

    //NFA Details
    const [appName, setAppName] = useState('');
    const [appDescription, setAppDescription] = useState('');
    const [appLogo, setAppLogo] = useState('');
    const [logoColor, setLogoColor] = useState('');
    const [ens, setEns] = useState({} as DropdownItem);
    const [domain, setDomain] = useState('');
    const [verifyNFA, setVerifyNFA] = useState(true);

    //Mint state
    //true means it's minted
    //false means it's not minted yet
    const [sucessMint, setSucessMint] = useState<boolean>(false);

    const setGithubStep = (step: number): void => {
      if (step > 0 && step <= 3) {
        setGithubStepContext(step);
      }
    };

    const setRepositoryConfig = (branch: DropdownItem, hash: string) => {
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
          appName,
          appDescription,
          appLogo,
          logoColor,
          ens,
          domain,
          verifyNFA,
          sucessMint,
          setGithubStep,
          setRepositoryConfig,
          setRepositoryName,
          setAppName,
          setAppDescription,
          setAppLogo,
          setLogoColor,
          setEns,
          setDomain,
          setVerifyNFA,
          setSucessMint,
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
