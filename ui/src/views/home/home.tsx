import { Flex } from '@/components';
import { MintStepper } from '@/components/layout/stepper';
import React from 'react';

export const Home = () => {
  return (
    <Flex css={{ justifyContent: 'center' }}>
      <h1>Home</h1>
      <MintStepper />
    </Flex>
  );
};
