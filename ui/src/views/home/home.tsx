import { useEffect, useState } from 'react';
import { lastFiveMintsDocument } from '@/../.graphclient';
import { Flex } from '@/components';
import { FleekERC721 } from '@/integrations/ethereum/contracts';
import { useQuery } from '@apollo/client';

export const Home = () => {
  const result = useQuery(lastFiveMintsDocument);

  const { data, loading, error } = result;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Flex css={{ flexDirection: 'column', margin: '200px' }}>
      <h1>Home</h1>
      {data &&
        data.transfers.map((transfer) => (
          <a
            target="_blank"
            href={`https://testnets.opensea.io/assets/mumbai/${FleekERC721.address}/${transfer.tokenId}`}
          >
            <u>Open NFA on Opensea</u>
          </a>
        ))}
    </Flex>
  );
};
