import { useCallback } from 'react';
import {
  Heading,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Textarea,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { getRepoAndCommit } from '@/utils';
import { validateFields } from './mint-site.utils';
import { HomeButton, InputFieldForm } from '@/components';
import { FleekERC721 } from '@/integrations';
import { useWalletStore } from '@/store';
import { useToast } from '@/hooks';

interface FormValues {
  name: string;
  description: string;
  githubCommit: string;
  ownerAddress: string;
  externalUrl: string;
  image: string;
  ens?: string;
}

const initialValues = {
  name: '',
  description: '',
  githubCommit: '',
  ownerAddress: '',
  externalUrl: '',
  image: '',
  ens: '',
} as FormValues;

export const MintSite = () => {
  const setToastInfo = useToast();
  const { provider } = useWalletStore();

  const handleSubmitForm = useCallback(
    async (values: FormValues) => {
      const {
        name,
        description,
        githubCommit,
        ownerAddress,
        externalUrl,
        image,
        ens,
      } = values;

      const { repo, commit_hash } = getRepoAndCommit(githubCommit);

      try {
        if (!provider) throw new Error('No provider found');
        await FleekERC721.mint(
          {
            name,
            description,
            owner: ownerAddress,
            externalUrl,
            image,
            ens,
            commitHash: commit_hash,
            repo,
          },
          provider
        );
        setToastInfo({
          title: 'Success!',
          description: 'Your site has been minted.',
          status: 'success',
        });
      } catch (err) {
        setToastInfo({
          title: 'Error!',
          description:
            'We had an error while minting your site. Please try again later',
          status: 'error',
        });
      }
    },
    [provider]
  );

  return (
    <>
      <Flex width="full" align="center" justifyContent="center" mt="30px">
        <Box width={{ base: '100%' }}>
          <HomeButton />
          <VStack spacing="10px">
            <Box textAlign="center" mt={2}>
              <Heading>Mint your Site</Heading>
            </Box>
            <Box textAlign="left" width="80%" justifyContent="center">
              <Formik
                validate={validateFields}
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
              >
                {({ values, touched, handleSubmit, isSubmitting, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      display="flex"
                      flexDirection={{ base: 'column', md: 'row' }}
                    >
                      <InputFieldForm
                        label="Name"
                        fieldName="name"
                        mr={5}
                        error={errors.name}
                        isInvalid={!!errors.name && touched.name}
                        isRequired
                      />
                      <InputFieldForm
                        label="Owner address"
                        fieldName="ownerAddress"
                        error={errors.ownerAddress}
                        isInvalid={
                          !!errors.ownerAddress && touched.ownerAddress
                        }
                        isRequired
                      />
                    </Box>
                    <FormControl
                      mt={6}
                      isRequired
                      isInvalid={!!errors.description && touched.description}
                    >
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <Field
                        as={Textarea}
                        name="description"
                        id="description"
                      />
                      {errors.description && (
                        <FormErrorMessage>
                          {errors.description}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <Box
                      display="flex"
                      flexDirection={{ base: 'column', md: 'row' }}
                      mt={6}
                    >
                      <InputFieldForm
                        label="Image (IPFS Link)"
                        fieldName="image"
                        mr={5}
                        error={errors.image}
                        isInvalid={!!errors.image && touched.image}
                        isRequired
                      />
                      <InputFieldForm
                        label="External url"
                        fieldName="externalUrl"
                        error={errors.externalUrl}
                        isInvalid={!!errors.externalUrl && touched.externalUrl}
                        isRequired
                      />
                    </Box>
                    <Grid
                      templateColumns={{
                        md: 'repeat(3, 1fr)',
                      }}
                      gap={4}
                      mt={6}
                    >
                      <GridItem colSpan={2}>
                        <InputFieldForm
                          label="Github commit url"
                          fieldName="githubCommit"
                          mr={5}
                          error={errors.githubCommit}
                          isInvalid={
                            !!errors.githubCommit && touched.githubCommit
                          }
                          isRequired
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <InputFieldForm label="ENS" fieldName="ens" />
                      </GridItem>
                    </Grid>
                    <Button
                      colorScheme="blue"
                      backgroundColor="#1d4ed8"
                      width="full"
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      loadingText="Minting..."
                      disabled={
                        isSubmitting ||
                        !values.name ||
                        !values.description ||
                        !values.githubCommit ||
                        !values.ownerAddress ||
                        !values.image ||
                        !values.externalUrl ||
                        !provider
                      }
                    >
                      Mint
                    </Button>
                  </form>
                )}
              </Formik>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

