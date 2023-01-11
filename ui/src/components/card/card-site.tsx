import { ImagePreview, TileInfo } from '@/components';
import { SiteNFTDetail } from '@/types';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardBody,
  Heading,
  LayoutProps,
  Link,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { FleekERC721 } from '@/integrations';
import { useQuery } from 'react-query';

interface CardSiteProps {
  tokenId: number;
}

type InfoContainerProps = {
  heading: string;
  info: React.ReactNode;
  width: LayoutProps['width'];
};

const InfoContainer = ({ heading, info, width }: InfoContainerProps) => (
  <TileInfo
    size="xs"
    direction="row"
    mr="5px"
    width={width}
    heading={heading}
    textAlignText="left"
    info={info}
  />
);

export const SiteCard: React.FC<CardSiteProps> = ({ tokenId }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<SiteNFTDetail>(
    `fetchDetail${tokenId}`,
    () => FleekERC721.tokenMetadata(tokenId)
  );

  if (!data || isLoading) return null;
  const { name, owner, image, external_url: externalUrl } = data as any;
  return (
    <Card
      _hover={{ cursor: 'pointer' }}
      borderColor="custom.white.100 !important"
      boxShadow="1px 10px 24px -2px #85848480"
      backgroundColor="custom.white.50"
      border="1px"
      borderRadius="10px"
      width="350px"
      height="350px"
      onClick={() => navigate(`/detail?tokenId=${tokenId}`)}
    >
      <CardBody width="350px" height="350px" paddingTop="10px">
        <Heading size="md" textAlign="center" marginBottom="10px">
          {name}
        </Heading>
        <Link
          href={externalUrl}
          isExternal
          onClick={(e) => e.stopPropagation()}
        >
          <Box height="180px">
            <ImagePreview
              backgroundColor="custom.black"
              display="block"
              marginLeft="auto"
              marginRight="auto"
              image={image}
              objectFit="contain"
              width="100%"
              height="100%"
              borderRadius="20px"
              boxShadow="0px 12px 24px -5px #5a575761"
            />
          </Box>
        </Link>
        <Stack mt="10px" spacing="3" overflowY="scroll">
          <InfoContainer heading="Owner" info={owner} width="auto" />
          <InfoContainer heading="Token ID" info={tokenId} width="100px" />
          <InfoContainer
            heading="External url"
            width="100px"
            info={
              <Link
                href={externalUrl}
                isExternal
                onClick={(e) => e.stopPropagation()}
              >
                <u>{externalUrl}</u>
              </Link>
            }
          />
        </Stack>
      </CardBody>
    </Card>
  );
};

