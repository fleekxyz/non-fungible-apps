import { CreateAccessPoint } from './create-ap.context';
import { CreateApStepper } from './create-ap.stepper';
import { CreateApStyles as S } from './create-ap.styles';

export const CreateAP: React.FC = () => {
  return (
    <S.Container>
      <CreateAccessPoint.Provider>
        <CreateApStepper />
      </CreateAccessPoint.Provider>
    </S.Container>
  );
};
