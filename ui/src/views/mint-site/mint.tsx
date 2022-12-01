import React from 'react';
import {
  Heading,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

export const MintSite = () => {
  return (
    <>
      <Flex width="full" align="center" justifyContent="center" mt="50px">
        <Box width="40%">
          <Box textAlign="center">
            <Heading>Mint your Site</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl isRequired>
                <FormLabel>Github commit (org, repo, commit)</FormLabel>
                <Input />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Owner address</FormLabel>
                <Input />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Controller address</FormLabel>
                <Input />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>IPFS Hash</FormLabel>
                <Input />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>ENS</FormLabel>
                <Input />
              </FormControl>
              <Button width="full" mt={4} type="submit">
                Mint
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

