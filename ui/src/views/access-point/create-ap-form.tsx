import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  IconButton,
  Stepper,
} from '@/components';
import { useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { AP } from './create-ap.context';
import { NfaPicker } from './nfa-picker';

export const CreateAPForm = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const [searchParams] = useSearchParams(search);

  const { nextStep, prevStep } = Stepper.useContext();
  const { token, appName, billing, setAppName, setToken } = AP.useContext();
  const { setArgs } = AP.useTransactionContext();

  useEffect(() => {
    const name = searchParams.get('name');
    if (id !== undefined && name) {
      //set value to context
      setToken({ value: id, label: name });
    }
  }, [id, searchParams]);

  const handleAppNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(e.target.value);
  };

  const handleContinueClick = () => {
    if (token && appName) {
      setArgs([token.value, appName, { value: billing }]);
      nextStep();
    }
  };

  return (
    <Card.Container css={{ width: '$107h' }}>
      <Card.Heading
        title={`Create Access Point ${token.label || ''}`}
        leftIcon={
          <IconButton
            aria-label="Add"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="back" />}
            css={{ mr: '$2' }}
            onClick={prevStep}
          />
        }
        rightIcon={
          <IconButton
            aria-label="Add"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="info" />}
          />
        }
      />
      <Card.Body>
        <Grid
          css={{
            rowGap: '$6',
          }}
        >
          {id === undefined && <NfaPicker />}
          <Form.Field>
            <Form.Label>App Name</Form.Label>
            <Form.Input value={appName} onChange={handleAppNameChange} />
          </Form.Field>
          <Button
            disabled={!appName || !token}
            colorScheme="blue"
            variant="solid"
            onClick={handleContinueClick}
          >
            Continue
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
