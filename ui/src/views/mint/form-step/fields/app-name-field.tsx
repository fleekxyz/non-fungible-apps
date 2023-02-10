import { Form } from '@/components';
import { Mint } from '../../mint.context';

export const AppNameField = () => {
  const { appName, setAppName } = Mint.useContext();

  const handleAppNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(e.target.value);
  };
  return (
    <Form.Field>
      <Form.Label>Name</Form.Label>
      <Form.Input
        placeholder="Your app name"
        value={appName}
        onChange={handleAppNameChange}
      />
    </Form.Field>
  );
};
