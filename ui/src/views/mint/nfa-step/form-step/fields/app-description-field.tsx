import { Form } from '@/components';

import { useMintFormContext } from '../mint-form.context';

export const AppDescriptionField: React.FC = () => {
  const {
    form: { appDescription },
  } = useMintFormContext();

  return (
    <Form.Field context={appDescription}>
      <Form.Label>Description</Form.Label>
      <Form.Textarea
        placeholder="Add information about your project here."
        css={{ height: 'auto' }}
      />
      <Form.Overline />
    </Form.Field>
  );
};
