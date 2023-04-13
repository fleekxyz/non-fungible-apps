import {
  Button,
  Card,
  DisplayText,
  Grid,
  Icon,
  IconButton,
  Spinner,
  Stepper,
  Text,
} from '@/components';
import { useState } from 'react';

export const CNAMEStep: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { prevStep, nextStep } = Stepper.useContext();

  const handleContinueClick = (): void => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      nextStep();
    }, 3000);
  };

  return (
    <Card.Container css={{ width: '$107h' }}>
      <Card.Heading
        title="Create Record"
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
        {isLoading ? (
          <Card.Text css={{ height: '$22', mt: '$6' }}>
            <Spinner />
            <Text>Waiting for DNS propagation, allow a few minutes.</Text>
          </Card.Text>
        ) : (
          <Grid
            css={{
              rowGap: '$6',
            }}
          >
            <Text>
              Create a CNAME record in your DNS provider pointing to our CDN
              endpoint.
            </Text>
            <DisplayText label="Record Type" value="CNAME" />
            <DisplayText label="Host" value="App" />
            <DisplayText
              label="Data (Points to)"
              value="8c12c649402442d88b5f.b-cdn.net"
            />
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={handleContinueClick}
            >
              I added the record
            </Button>
          </Grid>
        )}
      </Card.Body>
    </Card.Container>
  );
};
