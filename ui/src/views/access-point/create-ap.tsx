import { useParams } from 'react-router-dom';
import { CreateAPForm } from './create-ap-form';
import { AP } from './create-ap.context';

export const CreateAP = () => {
  return (
    <AP.Provider>
      <CreateAPForm />
    </AP.Provider>
  );
};
