import { Loading } from '@/components';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Accordion,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Link,
  VStack,
} from '@chakra-ui/react';
import { HomeButton } from '@/components/home-button';
import { ImagePreview } from '@/components/image-preview';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { fetchSiteDetail } from '@/mocks';
import { AccordionItem } from '@/components/accordion-item/accordion-item';
import { ErrorScreen } from '@/views/error-screen';
import { SiteNFTDetail } from '@/types';
import { CardAttributes } from '@/components/card';

export const MintedSiteDetail = () => {
  const [searchParams] = useSearchParams();
  const tokenIdParam = searchParams.get('tokenId');
  //TODO handle response type
  const { data, status } = useQuery('fetchDetail', () =>
    fetchSiteDetail(tokenIdParam as string)
  );

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <ErrorScreen />;
  }

  const getAttributesAccordion = () => {
    return (
      <HStack shouldWrapChildren display="inline" spacing="0px">
        <CardAttributes heading="Owner" info={owner} />
        {attributes.map((attribute) => (
          <CardAttributes
            key={attribute.trait_type}
            heading={attribute.trait_type}
            info={attribute.value}
          />
        ))}
        <CardAttributes heading="Token ID" info={tokenIdParam as string} />
      </HStack>
    );
  };

  const { owner, name, description, image, externalUrl, attributes } =
    data.data as SiteNFTDetail;
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
                      children={getAttributesAccordion()}
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

