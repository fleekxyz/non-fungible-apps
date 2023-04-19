import { Owner, Token } from '@/graphclient';
import { createContext } from '@/utils';

const [Provider, useContext] = createContext<IndexedNFA.Context>({
  name: 'IndexedNFA.Context',
  hookName: 'IndexedNFA.useContext',
  providerName: 'IndexedNFA.Provider',
});

export const IndexedNFA = {
  useContext,
  Provider: ({ children, nfa }: IndexedNFA.ProviderProps): JSX.Element => {
    return <Provider value={{ nfa }}>{children}</Provider>;
  },
};

export namespace IndexedNFA {
  export type Context = {
    nfa: Omit<Token, 'mintTransaction' | 'id' | 'owner'> & {
      owner: Pick<Owner, 'id'>;
    };
  };

  export type ProviderProps = {
    children: React.ReactNode | React.ReactNode[];
    nfa: Context['nfa'];
  };
}
