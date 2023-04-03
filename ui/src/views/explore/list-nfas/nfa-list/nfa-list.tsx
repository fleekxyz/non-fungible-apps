import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Flex,
  NFACard,
  NFACardSkeleton,
  NoResults,
} from '@/components';
import { lastNFAsPaginatedDocument, totalTokensDocument } from '@/graphclient';

const pageSize = 10; //Set this size to test pagination

export const NFAList: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const {
    data: totalTokens,
    loading: loadingTotalTokens,
    error: errorTotalTokens,
  } = useQuery(totalTokensDocument);

  const {
    data: dataMintedTokens,
    loading: loadingMintedTokens,
    error: errorMintedTokens,
    previousData,
  } = useQuery(lastNFAsPaginatedDocument, {
    variables: {
      pageSize,
      skip: (pageNumber - 1) * pageSize,
    },
  });

  const dataToShow = useMemo(() => {
    if (!dataMintedTokens) {
      if (!previousData) return [];
      return previousData.tokens;
    }
    return dataMintedTokens.tokens;
  }, [dataMintedTokens, previousData]);

  useEffect(() => {
    if (totalTokens && totalTokens.tokens.length > 0) {
      setTotalPages(Math.ceil(totalTokens.tokens.length / pageSize));
    }
  }, [totalTokens]);

  if (errorMintedTokens || errorTotalTokens) return <div>Error</div>; //TODO handle error

  const handlePreviousPage = (): void => {
    if (pageNumber > 1) {
      setPageNumber((prevState) => prevState - 1);
    }
  };

  const handleNextPage = (): void => {
    if (pageNumber + 1 <= totalPages)
      setPageNumber((prevState) => prevState + 1);
  };

  console.log('dataMintedTokens', dataToShow);

  return (
    <Flex css={{ flexDirection: 'column', gap: '$2' }}>
      <Flex css={{ gap: '$2' }}>
        {/* TODO this will be remove when we have pagination component */}
        <span>items per page: {pageSize}</span>
        <span>
          page: {pageNumber}/{totalPages}
        </span>
        <span>total items: {totalTokens?.tokens.length}</span>

        <Button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous page
        </Button>
        <Button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next page
        </Button>
      </Flex>
      <Flex css={{ gap: '$6', flexWrap: 'wrap' }}>
        {dataToShow.length > 0 &&
          dataToShow.map((token) => <NFACard data={token} key={token.id} />)}
        {loadingMintedTokens && (
          <>
            <NFACardSkeleton />
            <NFACardSkeleton />
            <NFACardSkeleton />
            <NFACardSkeleton />
          </>
        )}
        {!loadingMintedTokens && dataToShow.length === 0 && <NoResults />}
      </Flex>
    </Flex>
  );
};
