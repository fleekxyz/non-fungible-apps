import { ImagePreview, TileInfo } from '@/components';
import { SiteNFTDetails } from '@/types';
import { Box, Card, CardBody, Heading, Link, Stack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  site: SiteNFTDetails;
}

export const SiteCard: React.FC<Props> = ({ site }) => {
  const { name, owner, image, externalUrl, tokenId } = site;
  return (
    <Card
      // boxShadow="10px 10px 14px 1px #85848480"
      borderColor="#f3f3f36b !important"
      boxShadow="1px 10px 24px -2px #85848480"
      backgroundColor="#c5c5c50a"
      border="1px"
      borderRadius="10px"
      width="350px"
      height="350px"
      onClick={() => {
        alert('clicked');
      }}
    >
      <CardBody width="350px" height="350px" paddingTop="10px">
        <Heading size="md" textAlign="center" marginBottom="10px">
          {name}
        </Heading>
        <Link href={externalUrl} isExternal>
          <Box height="180px">
            <ImagePreview
              backgroundColor="#161616"
              display="block"
              marginLeft="auto"
              marginRight="auto"
              image={image}
              objectFit="contain"
              minW="100%"
              minH="100%"
              maxW="100%"
              maxH="100%"
              borderRadius="20px"
              boxShadow="0px 12px 24px -5px #5a575761"
            />
          </Box>
        </Link>
        <Stack mt="10px" spacing="3" overflowY="scroll">
          <TileInfo
            size="xs"
            direction="row"
            mr="5px"
            heading="Owner"
            textAlignText="left"
            info={owner}
          />
          <TileInfo
            size="xs"
            direction="row"
            width="100px"
            mr="5px"
            heading="Token ID"
            textAlignText="left"
            info={tokenId}
          />
          <TileInfo
            size="xs"
            direction="row"
            width="100px"
            heading="External url"
            textAlignText="left"
            info={
              <Link href={externalUrl} isExternal textDecor="ActiveBorder">
                <u>{externalUrl}</u>
              </Link>
            }
          />
        </Stack>
      </CardBody>
    </Card>
  );
};

