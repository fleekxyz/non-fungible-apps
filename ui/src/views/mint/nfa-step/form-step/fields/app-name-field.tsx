import { Form } from '@/components';
import { Mint } from '../../../mint.context';

const maxCharacters = 100;

export const AppNameField = () => {
  const { appName, setAppName } = Mint.useContext();

  const handleAppNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(e.target.value);
  };
  return (
    <Form.Field>
      <Form.Label isRequired>Name</Form.Label>
      <Form.Input
        placeholder="Your app name"
        value={appName}
        onChange={handleAppNameChange}
      />
      <Form.MaxLength>
        {appName.length}/{maxCharacters}
      </Form.MaxLength>
    </Form.Field>
  );
};
