import { useCallback } from 'react';
import {
  Heading,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  IconButton,
  useToast,
  UseToastOptions,
  Textarea,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { mintSiteNFT } from '@/mocks';
import { getRepoAndCommit } from '@/utils';
import { validateFields } from './mint-site.utils';
import { InputFieldForm } from '@/components';

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
  const toast = useToast();

  //TODO add hook to show the toast
  const showToast = (
    title: string,
    description: string,
    status: UseToastOptions['status']
  ) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSubmitForm = useCallback(async (values: FormValues) => {
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
      await mintSiteNFT({
        name,
        description,
        owner: ownerAddress,
        externalUrl,
        image,
        ens,
        commitHash: commit_hash,
        repo,
      });
      //TODO connect with the integration
      showToast('Success!', 'Your site has been minted.', 'success');
    } catch (err) {
      showToast(
        'Error!',
        'We had an error while minting your site. Please try again later',
        'error'
      );
    }
  }, []);

  return (
    <>
      <Flex width="full" align="center" justifyContent="center" mt="50px">
        <Box width={{ base: '100%', md: '80%' }}>
          <IconButton
            as={Link}
            to="/home"
            aria-label="back home"
            icon={<ArrowBackIcon />}
            variant="link"
            size={'xl'}
            textDecoration={'none'}
          />
          <Box textAlign="center" mt={2}>
            <Heading>Mint your Site</Heading>
          </Box>
          <Box my={4} textAlign="left">
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
                      isInvalid={!!errors.ownerAddress && touched.ownerAddress}
                      isRequired
                    />
                  </Box>
                  <FormControl
                    mt={6}
                    isRequired
                    isInvalid={!!errors.description && touched.description}
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Field as={Textarea} name="description" id="description" />
                    {errors.description && (
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
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
                      !values.externalUrl
                    }
                  >
                    Mint
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

