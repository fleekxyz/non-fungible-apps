import { lastTenMintsDocument } from '@/../.graphclient';
import { Button, Card, Flex, NoResults } from '@/components';
import { FleekERC721 } from '@/integrations/ethereum/contracts';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

export const NFAList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const result = useQuery(lastTenMintsDocument, {
    variables: {
      skip: pageNumber * 10,
    },
  });

  const { data, loading, error } = result;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <Flex css={{ flexDirection: 'column', margin: '$5', gap: '$2' }}>
      <Flex css={{ gap: '$2' }}>
        <span>page: {pageNumber + 1}</span>
        <Button onClick={handlePreviousPage}>Previous page</Button>
        <Button onClick={handleNextPage}>Next page</Button>
      </Flex>
      <Flex css={{ gap: '$2' }}>
        {data && data.newMints.length > 0 ? (
          data.newMints.map((mint) => (
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
