import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Accordion,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Link,
  VStack,
} from '@chakra-ui/react';
import {
  HomeButton,
  ImagePreview,
  AccordionItem,
  Loading,
  AttributesDetail,
} from '@/components';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { ErrorScreen } from '@/views';
import { SiteNFTDetail } from '@/types';
import { FleekERC721 } from '@/integrations';

export const MintedSiteDetail = () => {
  const [searchParams] = useSearchParams();
  const tokenIdParam = searchParams.get('tokenId');
  //TODO handle response type
  const { data, status } = useQuery<SiteNFTDetail>(
    `fetchDetail${tokenIdParam}`,
    async () => FleekERC721.tokenMetadata(Number(tokenIdParam))
  );

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <ErrorScreen />;
  }

  const { owner, name, description, image, externalUrl, attributes } =
    data as SiteNFTDetail;

  return (
    <>
      <Flex width="full" align="center" justifyContent="center">
        <Box width={{ base: '100%' }}>
          <HomeButton />
          <Box
            flexDirection="row"
            display="flex"
            justifyContent="space-evenly"
            mt={10}
          >
            <Box mr={5}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="flex-end"
                mb={5}
              >
                <Heading mr={5}>{name}</Heading>
              </Box>
              <Card backgroundColor="transparent" border="1px">
                <CardBody padding="1px 8px 10px 8px">
                  <Accordion defaultIndex={[0, 1]} allowMultiple width="45vw">
                    <AccordionItem
                      heading="Description"
                      minH={120}
                      maxH="auto"
                      children={<p>{description}</p>}
                    />
                    <AccordionItem
                      heading="Attributes"
                      children={
                        <AttributesDetail
                          owner={owner}
                          attributes={attributes}
                          tokendId={tokenIdParam as string}
                        />
                      }
                      padding="16px"
                    />
                  </Accordion>
                  <Box ml={5} mt={2}>
                    <Link href={externalUrl} isExternal>
                      Visit site <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Box>
                </CardBody>
              </Card>
            </Box>
            <VStack alignItems="flex-start">
              <Box
                border="1px"
                width="-webkit-fill-available"
                padding="5px 10px"
                borderTopRadius={10}
              >
                <Heading size="md">Preview</Heading>
              </Box>
              <Box
                mt="0px !important"
                boxSize="md"
                border="1px"
                padding={10}
                borderRadius={20}
                borderTopRadius={0}
                boxShadow="12px 10px 14px 6px #868686d1"
              >
                <ImagePreview
                  image={image}
                  width="auto"
                  height="auto"
                  maxW="100%"
                  maxH="100%"
                />
              </Box>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

