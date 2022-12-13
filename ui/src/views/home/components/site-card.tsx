import { ImagePreview, TileInfo } from '@/components';
import { SiteNFTDetails } from '@/types';
import { Button, Card, CardBody, Heading, Stack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  site: SiteNFTDetails;
}

export const SiteCard: React.FC<Props> = ({ site }) => {
  const { name, owner, image, externalUrl } = site;
  return (
    <Card width="sm" height="sm">
      <CardBody width={300} height={300}>
        <ImagePreview
          image={image}
          sizes="(max-width: 400px) 100px, 280px"
          objectFit="contain"
          minW="100%"
          minH="100%"
          maxW="100%"
          maxH="100%"
        />
        <Stack mt="6" spacing="3" overflowY="scroll">
          <Heading size="sm">{name}</Heading>
          <TileInfo size="xs" heading="Owner" info={owner} />
          <TileInfo size="xs" heading="External url" info={externalUrl} />
        </Stack>
      </CardBody>
      <Button />
    </Card>
  );
};

