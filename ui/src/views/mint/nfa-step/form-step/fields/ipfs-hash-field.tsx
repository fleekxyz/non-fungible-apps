import { Form } from '@/components';

import { useMintFormContext } from '../mint-form.context';

export const IPFSHashField: React.FC = () => {
  const {
    form: { ipfsHash },
  } = useMintFormContext();

  return (
    <Form.Field context={ipfsHash}>
      <Form.Label>IPFS Hash</Form.Label>
      <Form.Input placeholder="Your IPFS hash" />
      <Form.Overline />
    </Form.Field>
  );
};
