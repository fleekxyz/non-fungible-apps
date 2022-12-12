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
import { ethers } from 'ethers';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { mintSiteNFT } from '@/mocks';
import { getRepoAndCommit, isValidImageUrl, isValidUrl } from '@/utils';
import { HomeButton } from '@/components/home-button/home-button';

const initialValues = {
  name: '',
  description: '',
  githubCommit: '',
  ownerAddress: '',
  controllerAddress: '',
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

  const handleSubmit = useCallback(
    async (
      values: FormikValues,
      setSubmitting: (isSubmitting: boolean) => void
    ) => {
      const {
        name,
        description,
        githubCommit,
        ownerAddress,
        controllerAddress,
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
          controllerAddress,
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
          <HomeButton />
          <Box textAlign="center">
            <Heading>Mint your Site</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) =>
                handleSubmit(values, setSubmitting)
              }
            >
              {({
                values,
                touched,
                handleSubmit,
                isSubmitting,
                errors,
                setFieldValue,
                setTouched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box display="flex" flexDirection="row">
                    <FormControl
                      mr={5}
                      isRequired
                      isInvalid={touched.name && !values.name}
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field as={Input} name="name" id="name" type="text" />
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={
                        touched.ownerAddress &&
                        (!values.ownerAddress ||
                          !ethers.utils.isAddress(values.ownerAddress))
                      }
                    >
                      <FormLabel htmlFor="ownerAddress">
                        Owner address
                      </FormLabel>
                      <Field
                        as={Input}
                        name="ownerAddress"
                        id="ownerAddress"
                        type="text"
                        validate={(value: string) => {
                          let error;
                          if (!value) error = 'Owner address cannot be empty';
                          else if (!ethers.utils.isAddress(value))
                            error = 'Owner address is not a valid address';

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.ownerAddress}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <FormControl
                    mt={6}
                    isRequired
                    isInvalid={touched.description && !values.description}
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      id="description"
                      name="description"
                      minHeight={137}
                      onChange={(e) => {
                        setTouched({ ...touched, description: true });
                        setFieldValue('description', e.target.value);
                      }}
                    />
                  </FormControl>
                  <Box display="flex" flexDirection="row">
                    <FormControl
                      mt={6}
                      mr={5}
                      isRequired
                      isInvalid={
                        touched.image &&
                        (!values.image || !isValidImageUrl(values.image))
                        // TODO validate is an imaga (png, jpg, svg)
                      }
                    >
                      <FormLabel htmlFor="image">Image (IPFS Link)</FormLabel>
                      <Field
                        as={Input}
                        name="image"
                        id="image"
                        type="text"
                        validate={(value: string) => {
                          if (!isValidImageUrl(value))
                            return 'Image url is not a valid url';
                        }}
                      />
                      <FormErrorMessage>{errors.image}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      mt={6}
                      isRequired
                      isInvalid={
                        touched.externalUrl &&
                        (!values.externalUrl || !isValidUrl(values.externalUrl))
                      }
                    >
                      <FormLabel htmlFor="externalUrl">External url</FormLabel>
                      <Field
                        as={Input}
                        name="externalUrl"
                        id="externalUrl"
                        type="text"
                        validate={(value: string) => {
                          if (!isValidUrl(value))
                            return 'External url is not a valid url';
                        }}
                      />
                      <FormErrorMessage>{errors.externalUrl}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    <GridItem colSpan={2}>
                      <FormControl
                        mr={5}
                        mt={6}
                        isRequired
                        isInvalid={
                          touched.githubCommit &&
                          (!values.githubCommit ||
                            !isValidUrl(values.githubCommit))
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
                          validate={(value: string) => {
                            if (!isValidUrl(value))
                              return 'The github commit url is not a valid url';
                          }}
                        />
                        <FormErrorMessage>
                          {errors.githubCommit}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl mt={6}>
                        <FormLabel htmlFor="ens">ENS</FormLabel>
                        <Field as={Input} name="ens" id="ens" type="ens" />
                      </FormControl>
                    </GridItem>
                  </Grid>
                  {/* <Box display="flex" flexDirection="row">
                    <FormControl
                      mr={5}
                      mt={6}
                      isRequired
                      isInvalid={touched.githubCommit && !values.githubCommit}
                    >
                      <FormLabel htmlFor="githubCommit">
                        Github commit url
                      </FormLabel>
                      <Field
                        as={Input}
                        name="githubCommit"
                        id="githubCommit"
                        type="text"
                        validate={(value: string) => {
                          if (!isValidUrl(value))
                            return 'The github commit url is not a valid url';
                        }}
                      />
                      <FormErrorMessage>{errors.githubCommit}</FormErrorMessage>
                    </FormControl>
                    <FormControl mt={6}>
                      <FormLabel htmlFor="ens">ENS</FormLabel>
                      <Field as={Input} name="ens" id="ens" type="ens" />
                    </FormControl>
                  </Box> */}
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

