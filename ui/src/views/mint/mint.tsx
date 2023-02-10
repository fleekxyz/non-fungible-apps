import { Flex } from '@/components';
import { MintStepper } from './mint-stepper';
import { Mint as MintContext } from './mint.context';

export const Mint = () => (
  <Flex css={{ height: '100%', justifyContent: 'center' }}>
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
