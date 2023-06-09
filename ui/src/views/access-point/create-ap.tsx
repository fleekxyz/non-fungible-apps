import {
  CreateAccessPointFormProvider,
  useAccessPointFormContextInit,
} from './ap-form-step/create-ap.form.context';
import { CreateAccessPoint } from './create-ap.context';
import { CreateApStepper } from './create-ap.stepper';
import { CreateApStyles as S } from './create-ap.styles';

export const CreateAP: React.FC = () => {
  const context = useAccessPointFormContextInit();
  return (
    <S.Container>
      <CreateAccessPoint.Provider>
        <CreateAccessPointFormProvider value={context}>
          <CreateApStepper />
        </CreateAccessPointFormProvider>
      </CreateAccessPoint.Provider>
    </S.Container>
  );
};
