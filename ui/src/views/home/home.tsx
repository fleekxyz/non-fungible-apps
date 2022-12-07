import React from 'react';
import { Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

export const Home = () => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading>Welcome to Sites as NFTs by Fleek</Heading>
      {/* TODO add list sites */}
      <Button as={Link} to="/mint-site" mt={10}>
        Mint your site
      </Button>
    </Flex>
  );
};

