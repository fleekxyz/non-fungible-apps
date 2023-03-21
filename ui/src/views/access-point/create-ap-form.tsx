import { Button, Flex, Form } from '@/components';
import { AppLog } from '@/utils';
import { useParams } from 'react-router-dom';
import { AP } from './create-ap.context';

export const CreateAPForm = () => {
  const { id } = useParams();

  const { billing, appName, setAppName } = AP.useContext();

  const { setArgs } = AP.useTransactionContext();

  const handleAppNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(e.target.value);
  };

  const handlePrepare = () => {
    try {
      if (id !== undefined) setArgs([Number(id), appName, { value: billing }]);
    } catch (error) {
      AppLog.error('error');
    }
  };

  const handleCreateAP = () => {};

  return (
    <Flex>
      <h1>Create AP Form for token {id}</h1>

      <Form.Field>
        <Form.Label>App Name</Form.Label>
        <Form.Input value={appName} onChange={handleAppNameChange} />
      </Form.Field>
      <Button colorScheme="blue" variant="solid" onClick={handlePrepare}>
        Prepare
      </Button>
      <Button colorScheme="blue" variant="solid" onClick={handleCreateAP}>
        Create AP
      </Button>
    </Flex>
  );
};
