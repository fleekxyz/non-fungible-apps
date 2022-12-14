import React from 'react';
import { Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { ListSites } from './list';

export const Home = () => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading>Welcome to Sites as NFTs by Fleek</Heading>
      <Button as={Link} to="/mint-site" mt={10}>
        Mint your site
      </Button>
      <ListSites />
    </Flex>
  );
};

