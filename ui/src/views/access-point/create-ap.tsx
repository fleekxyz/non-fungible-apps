import { Flex } from '@/components';
import { AP } from './create-ap.context';
import { CreateApStepper } from './create-ap.stepper';

export const CreateAP = () => {
  return (
    <Flex
      css={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AP.Provider>
        <CreateApStepper />
      </AP.Provider>
    </Flex>
  );
};
