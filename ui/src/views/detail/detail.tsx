import { Loading, TileInfo } from '@/components';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Accordion, Box, Flex, Heading, Link, VStack } from '@chakra-ui/react';
import { HomeButton } from '@/components/home-button';
import { ImagePreview } from '@/components/image-preview';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { fetchSiteDetail } from '@/mocks';
import { AccordionItem } from './components/accordion-item';

export const MintedSiteDetail = () => {
  const [searchParams] = useSearchParams();
  const tokenId = searchParams.get('tokenId');
  const { data, status } = useQuery('fetchDetail', () =>
    fetchSiteDetail(tokenId as string)
  );

  if (status === 'loading') {
    return <Loading />;
  }

  const getAttributesAccordion = () => {
    return (
      <VStack align="flex-start">
        <TileInfo size="sm" heading="Commit hash" info={commitHash} />
        <TileInfo size="sm" heading="Github repo" info={githubRepo} />
        {ens && <TileInfo size="sm" heading="ENS" info={ens} />}
      </VStack>
    );
  };
  //TODO add error state

  const { name, description, image, externalUrl, commitHash, githubRepo, ens } =
    data.data;
  return (
    <>
      <Flex width="full" align="center" justifyContent="center" mt="50px">
        <Box width="80%">
          <HomeButton />
          <Box
            flexDirection="row"
            display="flex"
            justifyContent="space-evenly"
            mt={10}
          >
            <Box mr={20}>
              <Box display="flex" flexDirection="row" alignItems="flex-end">
                <Heading mr={5}>{name}</Heading>
              </Box>
              <Accordion
                defaultIndex={[0, 1]}
                allowMultiple
                mt={10}
                width="40vw"
              >
                <AccordionItem
                  heading="Description"
                  children={<p>{description}</p>}
                />
                <AccordionItem
                  heading="Attributes"
                  children={getAttributesAccordion()}
                />
              </Accordion>
              <Box ml={5} mt={2}>
                <Link href={externalUrl} isExternal>
                  Visit site <ExternalLinkIcon mx="2px" />
                </Link>
              </Box>
            </Box>
            <Box width="md">
              <ImagePreview image={image} />
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

