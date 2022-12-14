import { ImagePreview, TileInfo } from '@/components';
import { SiteNFTDetails } from '@/types';
import { Box, Button, Card, CardBody, Heading, Stack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  site: SiteNFTDetails;
}

export const SiteCard: React.FC<Props> = ({ site }) => {
  const { name, owner, image, externalUrl } = site;
  return (
    <Card
      width="sm"
      height="sm"
      backgroundColor="transparent"
      border="1px"
      width="350px"
      height="350px"
    >
      <CardBody width="350px" height="350px">
        <Box height="100px">
          <ImagePreview
            display="block"
            marginLeft="auto"
            marginRight="auto"
            image={image}
            sizes="(max-width: 200px) 50px, 100px"
            objectFit="contain"
            minW="100%"
            minH="100%"
            maxW="100%"
            maxH="100%"
          />
        </Box>
        <Stack mt="6" spacing="3" overflowY="scroll">
          <Heading size="sm">{name}</Heading>
          <TileInfo size="xs" heading="Owner" info={owner} />
          <TileInfo size="xs" heading="External url" info={externalUrl} />
        </Stack>
      </CardBody>
    </Card>
  );
};

