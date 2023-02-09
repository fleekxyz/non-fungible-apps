import { Flex } from '@/components';
import { MintStepper } from './mint-stepper';
import { Mint as MintContext } from './mint.context';

export const Mint = () => (
  <Flex css={{ height: 'inherit', justifyContent: 'center' }}>
    <Flex
      css={{
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <MintContext.Provider>
        <MintStepper />
      </MintContext.Provider>
    </Flex>
  </Flex>
);
