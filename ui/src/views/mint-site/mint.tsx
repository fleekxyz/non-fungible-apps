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
} from '@chakra-ui/react';
import { Formik, Field, FormikValues } from 'formik';
import { ethers } from 'ethers';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { mintSiteNFT } from '@/mocks';
import { getRepoAndCommit, isValidUrl } from '@/utils';

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
                    <FormControl>
                      <FormLabel>Controller address</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <Box width="container.md" mr={5}>
                      <FormControl
                        mt={6}
                        isRequired
                        isInvalid={touched.description && !values.description}
                      >
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Textarea
                          id="description"
                          name="description"
                          height={137}
                          onChange={(e) => {
                            setFieldValue('description', e.target.value);
                          }}
                        />
                      </FormControl>
                    </Box>
                    <Box width="container.md">
                      <FormControl
                        mt={6}
                        isRequired
                        isInvalid={!values.image && touched.image}
                      >
                        <FormLabel htmlFor="image">Image (IPFS Link)</FormLabel>
                        <Field
                          as={Input}
                          name="image"
                          id="image"
                          type="text"
                          validate={(value: string) => {
                            if (!isValidUrl(value))
                              return 'External url is not a valid url';
                          }}
                        />
                      </FormControl>
                      <FormControl
                        mt={6}
                        isRequired
                        isInvalid={
                          touched.externalUrl &&
                          (!values.externalUrl ||
                            !isValidUrl(values.externalUrl))
                        }
                      >
                        <FormLabel htmlFor="externalUrl">
                          External url
                        </FormLabel>
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
                        <FormErrorMessage>
                          {errors.externalUrl}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                  </Box>
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
                    />
                  </FormControl>
                  <Box display="flex" flexDirection="row">
                    <FormControl
                      mr={5}
                      mt={6}
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

                    <FormControl
                      mt={6}
                      isRequired
                      isInvalid={touched.ens && !values.ens}
                    >
                      <FormLabel htmlFor="ens">ENS</FormLabel>
                      <Field as={Input} name="ens" id="ens" type="ens" />
                    </FormControl>
                  </Box>
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
                      !values.ens
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

