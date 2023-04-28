import { Mint as MintContext } from './mint.context';
import { MintStyles as MS } from './mint.styles';
import { MintStepper } from './mint-stepper';
import { MintFormProvider, useMintFormContextInit } from './nfa-step/form-step';

export const Mint: React.FC = () => {
  const context = useMintFormContextInit();
  return (
    <MS.Container>
      <MintContext.Provider>
        <MintFormProvider value={context}>
          <MintStepper />
        </MintFormProvider>
      </MintContext.Provider>
    </MS.Container>
  );
};
