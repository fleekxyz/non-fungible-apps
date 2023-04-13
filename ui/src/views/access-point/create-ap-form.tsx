import { Card, Grid, Icon, IconButton, Stepper } from '@/components';

import { CreateAccessPoint } from './create-ap.context';
import { CreateAccessPointFormBody } from './create-ap.form-body';

export const CreateAccessPointForm: React.FC = () => {
  const { prevStep } = Stepper.useContext();

  const { nfa } = CreateAccessPoint.useContext();

  return (
    <Card.Container css={{ width: '$107h' }}>
      <Card.Heading
        title={`Create Access Point - ${nfa?.id || ''}`}
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
          <CreateAccessPointFormBody />
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
