import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Flex justifyContent="center" height="80vh" alignItems="center">
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

