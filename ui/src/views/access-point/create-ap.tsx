import { Flex } from '@/components';

import {
  CreateAccessPointFormProvider,
  useAccessPointFormContextInit,
} from './ap-form-step/create-ap.form.context';
import { CreateAccessPoint } from './create-ap.context';
import { CreateApStepper } from './create-ap.stepper';

export const CreateAP: React.FC = () => {
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
