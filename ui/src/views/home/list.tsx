import { Loading } from '@/components';
import { Flex } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { SiteCard } from '@/components';
import { FleekERC721 } from '@/integrations';

export const ListSites = () => {
  const { data, isLoading } = useQuery('fetchLastTokenId', () =>
    FleekERC721.lastTokenId()
  );

  if (!data || isLoading) return <Loading />;
  return (
    <Flex gap={10} mt="40px" flexWrap="wrap" justifyContent="center">
      {new Array(data).fill(0).map((_, index) => {
        const id = data - index - 1;
        return <SiteCard tokenId={id} />;
      })}
    </Flex>
  );
};

