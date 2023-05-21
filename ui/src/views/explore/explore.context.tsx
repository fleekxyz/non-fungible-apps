import { useState } from 'react';

import { OrderDirection, Token_orderBy } from '@/graphclient';
import { createContext } from '@/utils';

type View = 'grid' | 'list';

export type ExploreContext = {
  search: string;
  orderBy: Token_orderBy;
  orderDirection: OrderDirection;
  pageNumber: number;
  endReached: boolean;
  nfaView: View;
  setSearch: (search: string) => void;
  setOrderBy: (orderBy: Token_orderBy) => void;
  setOrderDirection: (orderDirection: OrderDirection) => void;
  setPageNumber: (pageNumber: number) => void;
  setEndReached: (isEndReaced: boolean) => void;
  setNFAView: (view: View) => void;
};

const [ExploreProvider, useContext] = createContext<ExploreContext>({
  name: 'Explore.Context',
  hookName: 'Explore.useContext',
  providerName: 'Explore.Provider',
});

export abstract class Explore {
  static readonly useContext = useContext;

  static readonly Provider: React.FC<Explore.ProviderProps> = ({
    children,
  }: Explore.ProviderProps) => {
    const [search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState<Token_orderBy>('tokenId');
    const [orderDirection, setOrderDirection] =
      useState<OrderDirection>('desc');
    const [pageNumber, setPageNumber] = useState(0);
    const [endReached, setEndReached] = useState(false);
    const [nfaView, setNFAView] = useState<View>('grid');

    const context = {
      search,
      orderBy,
      orderDirection,
      pageNumber,
      endReached,
      nfaView,
      setSearch,
      setOrderBy,
      setOrderDirection,
      setPageNumber,
      setEndReached,
      setNFAView,
    };

    return <ExploreProvider value={context}>{children}</ExploreProvider>;
  };
}

export namespace Explore {
  export type ProviderProps = {
    children: React.ReactNode;
  };
}
