import React from 'react';
import { Loading } from '@/components';
import { fetchMintedSites } from '@/mocks';
import { SiteNFTDetails } from '@/types';
import { Grid, GridItem } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { SiteCard } from './components';

export const ListSites = () => {
  const { data, isLoading } = useQuery<Array<SiteNFTDetails>, Error>(
    'fetchSites',
    fetchMintedSites
  );

  if (isLoading) return <Loading />;
  return (
    <>
      <Grid
        templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' }}
        gap={10}
        mt="40px"
      >
        {data &&
          data.listSites.map((site: SiteNFTDetails) => (
            <GridItem key={site.tokenId}>
              <SiteCard site={site} />
            </GridItem>
          ))}
      </Grid>
    </>
  );
};

