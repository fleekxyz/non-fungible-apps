import { Flex } from '@/components';
import { MintStepper } from './mint-stepper';
import { Mint as MintContext } from './mint.context';

export const Mint = () => (
  <Flex
    css={{
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <MintContext.Provider>
      <MintStepper />
    </MintContext.Provider>
  </Flex>
);
