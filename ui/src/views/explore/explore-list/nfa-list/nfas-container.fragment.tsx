import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { lastNFAsPaginatedDocument } from '@/graphclient';
import { useWindowScrollEnd } from '@/hooks';

import { Explore } from '../../explore.context';
import { NFAGridFragment } from './nfa-grid.fragment';
import { NFAListFragment } from './nfa-list.fragment';

const pageSize = 10; //Set this size to test pagination

export const NFAsContainerFragment: React.FC = () => {
  const {
    endReached,
    orderBy,
    orderDirection,
    pageNumber,
    search,
    nfaView,
    setEndReached,
    setPageNumber,
  } = Explore.useContext();

  const {
    data: { tokens } = { tokens: [] },
    loading: isLoading,
    error: queryError,
  } = useQuery(lastNFAsPaginatedDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      pageSize,
      searchValue: search,
      orderBy,
      orderDirection,
      skip: pageNumber * pageSize, //skip is for the pagination
    },
    onCompleted: (data) => {
      if (data.tokens.length - tokens.length < pageSize) setEndReached(true);
    },
  });

  useEffect(() => {
    // Update page number when there are cached tokens
    setPageNumber(Math.ceil(tokens.length / pageSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useWindowScrollEnd(() => {
    if (isLoading || endReached || queryError) return;
    setPageNumber(pageNumber + 1);
  });

  if (queryError) return <div>Error</div>; //TODO handle error

  if (nfaView === 'grid')
    return <NFAGridFragment tokens={tokens} isLoading={isLoading} />;
  else {
    return <NFAListFragment tokens={tokens} isLoading={isLoading} />;
  }
};
