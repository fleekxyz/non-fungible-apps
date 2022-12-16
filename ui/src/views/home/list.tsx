import { Loading } from '@/components';
import { Grid, GridItem } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { SiteCard } from '@/components';
import { FleekERC721 } from '@/integrations';

export const ListSites = () => {
  const { data, isLoading } = useQuery('fetchLastTokenId', () =>
    FleekERC721.lastTokenId()
  );

  if (!data || isLoading) return <Loading />;
  return (
    <Grid
      templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' }}
      gap={10}
      mt="40px"
    >
      {new Array(data).fill(0).map((_, index) => {
        const id = data - index - 1;
        return (
          <GridItem key={id}>
            <SiteCard tokenId={id} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

