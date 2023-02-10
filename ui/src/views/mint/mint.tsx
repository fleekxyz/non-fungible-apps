import { Flex } from '@/components';
import { MintStepper } from './mint-stepper';

export const Mint = () => (
  <Flex css={{ height: 'inherit', justifyContent: 'center' }}>
    <Flex
      css={{
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <MintStepper />
    </Flex>
  </Flex>
);
