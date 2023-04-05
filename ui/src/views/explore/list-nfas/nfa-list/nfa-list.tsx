import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { Flex, NFACard, NFACardSkeleton, NoResults } from '@/components';
import { lastNFAsPaginatedDocument } from '@/graphclient';
import { useWindowScrollEnd } from '@/hooks';

const pageSize = 10; //Set this size to test pagination

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
    setPageNumber((prevState) => prevState + 1);
  });

  if (queryError) return <div>Error</div>; //TODO handle error

  return (
    <Flex
      css={{
        flexDirection: 'column',
        gap: '$2',
        my: '$6',
        minHeight: '50vh',
        marginBottom: '30vh', // TODO: remove this if we add page footer
      }}
    >
      <Flex css={{ gap: '$6', flexWrap: 'wrap' }}>
        {tokens.map((token) => (
          <NFACard data={token} key={token.id} />
        ))}
        {isLoading && <LoadingSkeletons />}
        {!isLoading && tokens.length === 0 && <NoResults />}
      </Flex>
    </Flex>
  );
};
