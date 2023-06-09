import { useState } from 'react';

import { OrderDirection, Owner, Token } from '@/graphclient';
import { createContext } from '@/utils';

const [Provider, useContext] = createContext<IndexedNFA.Context>({
  name: 'IndexedNFA.Context',
  hookName: 'IndexedNFA.useContext',
  providerName: 'IndexedNFA.Provider',
});

export const IndexedNFA = {
  useContext,
  Provider: ({ children, nfa }: IndexedNFA.ProviderProps): JSX.Element => {
    const [orderDirection, setOrderDirection] =
      useState<OrderDirection>('desc');
    const [pageNumber, setPageNumber] = useState(0);
    const [endReached, setEndReached] = useState(false);

    const context = {
      nfa,
      orderDirection,
      pageNumber,
      endReached,
      setOrderDirection,
      setPageNumber,
      setEndReached,
    };
    return <Provider value={context}>{children}</Provider>;
  },
};

export namespace IndexedNFA {
  export type Context = {
    nfa: Omit<Token, 'mintTransaction' | 'id' | 'owner'> & {
      owner: Pick<Owner, 'id'>;
    };
    orderDirection: OrderDirection;
    pageNumber: number;
    endReached: boolean;
    setOrderDirection: (orderDirection: OrderDirection) => void;
    setPageNumber: (pageNumber: number) => void;
    setEndReached: (isEndReaced: boolean) => void;
  };

  export type ProviderProps = {
    children: React.ReactNode | React.ReactNode[];
    nfa: Context['nfa'];
  };
}
