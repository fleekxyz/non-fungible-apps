import { Form } from '@/components';
import { Mint } from '../../mint.context';

export const AppDescriptionField = () => {
  const { appDescription, setAppDescription } = Mint.useContext();

  const handleAppDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAppDescription(e.target.value);
  };

  return (
    <Form.Field>
      <Form.Label>Description</Form.Label>
      <Form.Textarea
        placeholder="Add information about your project here."
        css={{ height: 'auto' }}
        value={appDescription}
        onChange={handleAppDescriptionChange}
      />
    </Form.Field>
  );
};
