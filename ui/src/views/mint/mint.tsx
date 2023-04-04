import { Flex } from '@/components';

import { Mint as MintContext } from './mint.context';
import { MintStepper } from './mint-stepper';
import { MintFormProvider, useMintFormContextInit } from './nfa-step/form-step';

export const Mint: React.FC = () => {
  const context = useMintFormContextInit();
  return (
    <Flex
      css={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MintContext.Provider>
        <MintFormProvider value={context}>
          <MintStepper />
        </MintFormProvider>
      </MintContext.Provider>
    </Flex>
  );
};
