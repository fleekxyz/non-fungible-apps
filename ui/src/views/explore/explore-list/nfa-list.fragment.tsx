import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { NFACard, NFACardSkeleton } from '@/components';
import { lastNFAsPaginatedDocument } from '@/graphclient';
import { useWindowScrollEnd } from '@/hooks';

import { Explore } from '../explore.context';
import { NFAListFragmentStyles as S } from './nfa-list.styles';

const pageSize = 10; //Set this size to test pagination

const LoadingSkeletons: React.FC = () => (
  <>
    <NFACardSkeleton />
    <NFACardSkeleton />
    <NFACardSkeleton />
    <NFACardSkeleton />
  </>
);

export const NFAListFragment: React.FC = () => {
  const {
    endReached,
    orderBy,
    orderDirection,
    pageNumber,
    search,
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

  return (
    <S.Container>
      {tokens.map((token) => (
        <NFACard data={token} key={token.id} />
      ))}

      {isLoading && <LoadingSkeletons />}

      {!isLoading && tokens.length === 0 && (
        <S.EmptyMessage>Nothing found.</S.EmptyMessage>
      )}
    </S.Container>
  );
};
