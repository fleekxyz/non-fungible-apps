import { Form } from '@/components';
import { Mint } from '../../../mint.context';

const maxCharacters = 250;

export const AppDescriptionField = () => {
  const { appDescription, setAppDescription } = Mint.useContext();

  const handleAppDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length > maxCharacters) return;
    setAppDescription(e.target.value);
  };

  return (
    <Form.Field>
      <Form.Label isRequired>Description</Form.Label>
      <Form.Textarea
        placeholder="Add information about your project here."
        css={{ height: 'auto' }}
        value={appDescription}
        onChange={handleAppDescriptionChange}
      />
      <Form.Label css={{ textAlign: 'right' }}>
        {appDescription.length}/{maxCharacters}
      </Form.Label>
    </Form.Field>
  );
};
