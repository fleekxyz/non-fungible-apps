import { getNFADocument } from '@/../.graphclient';
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  IconButton,
  Stepper,
} from '@/components';
import { useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CreateAccessPoint } from './create-ap.context';
import { NfaPicker } from './nfa-picker';

export const CreateAccessPointForm = () => {
  const { id } = useParams();

  const { nextStep, prevStep } = Stepper.useContext();
  const { nfa, appName, billing, setAppName, setNfa } =
    CreateAccessPoint.useContext();
  const { setArgs } = CreateAccessPoint.useTransactionContext();

  const { data: nfaData } = useQuery(getNFADocument, {
    skip: id === undefined,
    variables: {
      id: ethers.utils.hexlify(Number(id)),
    },
  });

  useEffect(() => {
    if (nfaData && nfaData.token && id) {
      const { name } = nfaData.token;
      setNfa({ value: id, label: name });
    }
  }, [nfaData, id]);

  const handleAppNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(e.target.value);
  };

  const handleContinueClick = () => {
    if (nfa && appName) {
      setArgs([Number(nfa.value), appName, { value: billing }]);
      nextStep();
    }
  };

  return (
    <Card.Container css={{ width: '$107h' }}>
      <Card.Heading
        title={`Create Access Point`}
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
            // TODO add form field validation
            disabled={!appName || !nfa}
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
