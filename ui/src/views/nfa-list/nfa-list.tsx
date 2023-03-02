import { lastTenMintsDocument, totalTokensDocument } from '@/../.graphclient';
import { Button, Card, Flex, NoResults } from '@/components';
import { FleekERC721 } from '@/integrations/ethereum/contracts';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const pageSize = 2; //Set this size to test pagination

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
  } = useQuery(lastTenMintsDocument, {
    variables: {
      //first page is 0
      skip: pageNumber > 0 ? (pageNumber - 1) * pageSize : pageNumber,
    },
  });

  useEffect(() => {
    if (totalTokens && totalTokens.tokens.length > 0) {
      setTotalPages(Math.ceil(totalTokens.tokens.length / pageSize));
    }
  });

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
    <Flex css={{ flexDirection: 'column', margin: '$5', gap: '$2' }}>
      <Flex css={{ gap: '$2' }}>
        {/* TODO this will be remove when we have pagination component */}
        <span>
          page: {pageNumber}/{totalPages}
        </span>

        <Button
          onClick={handlePreviousPage}
          disabled={!(pageNumber >= totalPages)}
        >
          Previous page
        </Button>
        <Button onClick={handleNextPage} disabled={!(pageNumber < totalPages)}>
          Next page
        </Button>
      </Flex>
      <Flex css={{ gap: '$2' }}>
        {dataMintedTokens && dataMintedTokens.newMints.length > 0 ? (
          dataMintedTokens.newMints.map((mint) => (
            <Card.Container key={mint.tokenId}>
              <Card.Heading title={mint.name} />
              <Card.Body>
                <a
                  target="_blank"
                  href={`https://testnets.opensea.io/assets/mumbai/${FleekERC721.address}/${mint.tokenId}`}
                >
                  <u>Open NFA on Opensea</u>
                </a>
              </Card.Body>
            </Card.Container>
          ))
        ) : (
          <NoResults />
        )}
      </Flex>
    </Flex>
  );
};
