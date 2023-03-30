import { Flex } from '@/components';
import { CreateAccessPoint } from './create-ap.context';
import {
  CreateAccessPointFormProvider,
  useAccessPointFormContextInit,
} from './create-ap.form.context';
import { CreateApStepper } from './create-ap.stepper';

export const CreateAP = () => {
  const context = useAccessPointFormContextInit();
  return (
    <Flex
      css={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CreateAccessPoint.Provider>
        <CreateAccessPointFormProvider value={context}>
          <CreateApStepper />
        </CreateAccessPointFormProvider>
      </CreateAccessPoint.Provider>
    </Flex>
  );
};
