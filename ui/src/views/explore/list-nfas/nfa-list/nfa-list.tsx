import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Flex,
  NFACard,
  NFACardSkeleton,
  NoResults,
} from '@/components';
import { lastNFAsPaginatedDocument } from '@/graphclient';

const pageSize = 4; //Set this size to test pagination

const LoadingSkeletons: React.FC = () => (
  <>
    <NFACardSkeleton />
    <NFACardSkeleton />
    <NFACardSkeleton />
    <NFACardSkeleton />
  </>
);

export const NFAList: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [endReached, setEndReached] = useState(false);

  const {
    data: { tokens } = { tokens: [] },
    loading: isLoading,
    error: queryError,
  } = useQuery(lastNFAsPaginatedDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      pageSize,
      skip: pageNumber * pageSize,
    },
    onCompleted: (data) => {
      if (data.tokens.length === tokens.length) setEndReached(true);
    },
  });

  useEffect(() => {
    // Update page number when there are cached tokens
    setPageNumber(Math.ceil(tokens.length / pageSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (queryError) return <div>Error</div>; //TODO handle error

  const handleNextPage = (): void => {
    if (endReached) return;
    setPageNumber((prevState) => prevState + 1);
  };

  return (
    <Flex css={{ flexDirection: 'column', gap: '$2' }}>
      <span>page: {pageNumber}</span>
      <Flex css={{ gap: '$2' }}>
        <Button onClick={handleNextPage} disabled={endReached}>
          Next page
        </Button>
      </Flex>
      <Flex css={{ gap: '$6', flexWrap: 'wrap' }}>
        {tokens.length > 0 &&
          tokens.map((token) => <NFACard data={token} key={token.id} />)}
        {isLoading && <LoadingSkeletons />}
        {!isLoading && tokens.length === 0 && <NoResults />}
      </Flex>
    </Flex>
  );
};
