import { Form } from '@/components';

import { useMintFormContext } from '../../mint-form.context';

export const DomainField: React.FC = () => {
  const {
    form: { domainURL },
  } = useMintFormContext();
  return (
    <Form.Field context={domainURL} css={{ flex: 1 }}>
      <Form.Label>Domain</Form.Label>
      <Form.Input placeholder="mydomain.com" />
      <Form.Overline />
    </Form.Field>
  );
};
