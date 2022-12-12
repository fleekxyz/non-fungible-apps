import { ImagePreview, TileInfo } from '@/components';
import { SiteNFT } from '@/types';
import { Button, Card, CardBody, Heading, Stack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  site: SiteNFT;
}

export const SiteCard: React.FC<Props> = ({ site }) => {
  const { name, owner, image, externalUrl } = site;
  return (
    <Card maxW="sm">
      <CardBody>
        <ImagePreview image={image} />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <TileInfo size="sm" heading="Owner" info={owner} />
          <TileInfo size="sm" heading="External url" info={externalUrl} />
        </Stack>
      </CardBody>
      <Button />
    </Card>
  );
};

