import React from 'react';
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
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { ethers } from 'ethers';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export const MintSite = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const showToast = (
    title: string,
    description: string,
    status: UseToastOptions['status']
  ) => {
    toast({
      title,
      description,
      status,
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <Flex width="full" align="center" justifyContent="center" mt="50px">
        <Box width="40%">
          <IconButton
            aria-label="back home"
            icon={<ArrowBackIcon />}
            onClick={() => navigate('/home')}
          />
          <Box textAlign="center">
            <Heading>Mint your Site</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik
              initialValues={{
                githubCommit: '',
                ownerAddress: '',
                controllerAddress: '',
                ipfsHash: '',
                ens: '',
              }}
              onSubmit={() => {
                try {
                  //TODO connect to the contract
                  showToast(
                    'Success!',
                    'Your site has been minted.',
                    'success'
                  );
                } catch (err) {
                  showToast(
                    'Error!',
                    'We had an error while minting your site. Please try again later',
                    'error'
                  );
                }
              }}
            >
              {({ values, touched, handleSubmit, isSubmitting, errors }) => (
                <form onSubmit={handleSubmit}>
                  <FormControl
                    isRequired
                    isInvalid={touched.githubCommit && !values.githubCommit}
                  >
                    <FormLabel htmlFor="githubCommit">
                      Github commit (org, repo, commit)
                    </FormLabel>
                    <Field
                      as={Input}
                      name="githubCommit"
                      id="githubCommit"
                      type="text"
                    />
                  </FormControl>
                  <FormControl
                    mt={6}
                    isRequired
                    isInvalid={
                      touched.ownerAddress &&
                      (!values.ownerAddress ||
                        !ethers.utils.isAddress(values.ownerAddress))
                    }
                  >
                    <FormLabel htmlFor="ownerAddress">Owner address</FormLabel>
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
                  <FormControl mt={6}>
                    <FormLabel>Controller address</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <FormControl
                    mt={6}
                    isRequired
                    isInvalid={touched.ipfsHash && !values.ipfsHash}
                  >
                    <FormLabel htmlFor="ipfsHash">IPFS Hash</FormLabel>
                    <Field
                      as={Input}
                      name="ipfsHash"
                      id="ipfsHash"
                      type="ipfsHash"
                    />
                  </FormControl>
                  <FormControl
                    mt={6}
                    isRequired
                    isInvalid={touched.ens && !values.ens}
                  >
                    <FormLabel htmlFor="ens">ENS</FormLabel>
                    <Field as={Input} name="ens" id="ens" type="ens" />
                  </FormControl>
                  <Button
                    width="full"
                    mt={4}
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !(
                        !!values.githubCommit &&
                        !!values.ownerAddress &&
                        !!values.ipfsHash &&
                        !!values.ens
                      )
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

