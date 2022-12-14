import { Flex, Heading } from '@chakra-ui/react';

export const ErrorScreen = () => {
  return (
    <Flex justifyContent="center" height="80vh" alignItems="center">
      <Heading size="md">Something went wrong</Heading>
    </Flex>
  );
};
