/* eslint-disable react/react-in-jsx-scope */
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, Flex, NFACard, NoResults } from '@/components';
import { lastNFAsPaginatedDocument, totalTokensDocument } from '@/graphclient';
import { FleekERC721 } from '@/integrations/ethereum/contracts';

const pageSize = 10; //Set this size to test pagination

export const NFAList = () => {
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
  } = useQuery(lastNFAsPaginatedDocument, {
    variables: {
      //first page is 0
      pageSize,
      skip: pageNumber > 0 ? (pageNumber - 1) * pageSize : pageNumber,
    },
  });

  useEffect(() => {
    if (totalTokens && totalTokens.tokens.length > 0) {
      setTotalPages(Math.ceil(totalTokens.tokens.length / pageSize));
    }
  }, [totalTokens]);

  if (loadingMintedTokens || loadingTotalTokens) return <div>Loading...</div>; //TODO handle loading
  if (errorMintedTokens || errorTotalTokens) return <div>Error</div>; //TODO handle error

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevState) => prevState - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber + 1 <= totalPages)
      setPageNumber((prevState) => prevState + 1);
  };

  return (
    <Flex css={{ flexDirection: 'column', gap: '$2' }}>
      <Flex css={{ gap: '$2' }}>
        {/* TODO this will be remove when we have pagination component */}
        <span>items per page: {pageSize}</span>
        <span>
          page: {pageNumber}/{totalPages}
        </span>

        <Button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous page
        </Button>
        <Button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next page
        </Button>
      </Flex>
      <Flex css={{ gap: '$6', flexWrap: 'wrap' }}>
        {dataMintedTokens && dataMintedTokens.tokens.length > 0 ? (
          dataMintedTokens.tokens.map((mint) => (
            <NFACard data={mint} key={mint.id} />
          ))
        ) : (
          <NoResults />
        )}
      </Flex>
    </Flex>
  );
};
