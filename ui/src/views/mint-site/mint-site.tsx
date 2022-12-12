import React, { useCallback } from 'react';
import {
  Heading,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  IconButton,
  useToast,
  UseToastOptions,
  Textarea,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Formik, Field, FormikValues } from 'formik';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { mintSiteNFT } from '@/mocks';
import { getRepoAndCommit } from '@/utils';
import { validateFields } from './mint-site.utils';

const initialValues = {
  name: '',
  description: '',
  githubCommit: '',
  ownerAddress: '',
  externalUrl: '',
  image: '',
  ens: '',
};

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

  const handleSubmitForm = useCallback(
    async (
      values: FormikValues,
      setSubmitting: (isSubmitting: boolean) => void
    ) => {
      debugger;
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
      setSubmitting(false);
    },
    []
  );

  return (
    <>
      <Flex width="full" align="center" justifyContent="center" mt="50px">
        <Box width="80%">
          <IconButton
            as={Link}
            to="/home"
            aria-label="back home"
            icon={<ArrowBackIcon />}
          />
          <Box textAlign="center">
            <Heading>Mint your Site</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik
              validate={validateFields}
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                debugger;
                handleSubmitForm(values, setSubmitting);
              }}
            >
              {({ values, touched, handleSubmit, isSubmitting, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Box display="flex" flexDirection="row">
                    <FormControl
                      mr={5}
                      isRequired
                      isInvalid={!!errors.name && touched.name}
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field as={Input} name="name" id="name" type="text" />
                      {errors.name && (
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={!!errors.ownerAddress && touched.ownerAddress}
                    >
                      <FormLabel htmlFor="ownerAddress">
                        Owner address
                      </FormLabel>
                      <Field
                        as={Input}
                        name="ownerAddress"
                        id="ownerAddress"
                        type="text"
                      />
                      {errors.ownerAddress && (
                        <FormErrorMessage>
                          {errors.ownerAddress}
                        </FormErrorMessage>
                      )}
                    </FormControl>
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
                  <Box display="flex" flexDirection="row" mt={6}>
                    <FormControl
                      mr={5}
                      isRequired
                      isInvalid={!!errors.image && touched.image}
                    >
                      <FormLabel htmlFor="image">Image (IPFS Link)</FormLabel>
                      <Field as={Input} name="image" id="image" type="text" />
                      {errors.image && (
                        <FormErrorMessage>{errors.image}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={touched.externalUrl && !!errors.externalUrl}
                    >
                      <FormLabel htmlFor="externalUrl">External url</FormLabel>
                      <Field
                        as={Input}
                        name="externalUrl"
                        id="externalUrl"
                        type="text"
                      />
                      {errors.externalUrl && (
                        <FormErrorMessage>
                          {errors.externalUrl}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Box>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={6}>
                    <GridItem colSpan={2}>
                      <FormControl
                        mr={5}
                        isRequired
                        isInvalid={
                          touched.githubCommit && !!errors.githubCommit
                        }
                      >
                        <FormLabel htmlFor="githubCommit">
                          Github commit url
                        </FormLabel>
                        <Field
                          as={Input}
                          name="githubCommit"
                          id="githubCommit"
                          type="text"
                        />
                        {errors.githubCommit && (
                          <FormErrorMessage>
                            {errors.githubCommit}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl>
                        <FormLabel htmlFor="ens">ENS</FormLabel>
                        <Field as={Input} name="ens" id="ens" type="ens" />
                      </FormControl>
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

