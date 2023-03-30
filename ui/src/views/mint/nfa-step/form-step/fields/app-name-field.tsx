import { Form } from '@/components';
import { useMintFormContext } from '../mint-form.context';

export const AppNameField = () => {
  const {
    form: { appName },
  } = useMintFormContext();

  return (
    <Form.Field context={appName}>
      <Form.Label>Name</Form.Label>
      <Form.Input placeholder="Your app name" />
      <Form.Overline />
    </Form.Field>
  );
};
