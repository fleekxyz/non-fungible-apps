import { Loading } from '@/components';
import { fetchMintedSites } from '@/mocks';
import { SiteNFT } from '@/types';
import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { SiteCard } from './components';

export const ListSites = () => {
  const [data, isLoading] = useQuery('fetchSites', fetchMintedSites);

  if (isLoading) return <Loading />;
  return (
    <>
      <Grid
        templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' }}
        gap={6}
      >
        {data?.map((site: SiteNFT) => (
          <GridItem>
            <SiteCard site={site} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

