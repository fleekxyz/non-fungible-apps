import { useParams } from 'react-router-dom';

export const CreateAP = () => {
  const { id } = useParams();
  return <>Token to create AP:{id}</>;
};
