import { Flex } from '@/components';

import { Mint as MintContext } from './mint.context';
import { MintStepper } from './mint-stepper';

export const Mint = () => (
  <Flex
    css={{
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <MintContext.Provider>
      <MintStepper />
    </MintContext.Provider>
  </Flex>
);
