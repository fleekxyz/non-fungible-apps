import { Card, Flex, Icon, IconButton, Stepper } from '@/components';

import { CreateAccessPointFormBody } from './create-ap-form-body';

export const CreateAccessPointForm: React.FC = () => {
  const { prevStep } = Stepper.useContext();

  return (
    <Card.Container css={{ width: '$107h' }}>
      <Card.Heading
        title="Enter Domain"
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
        <Flex
          css={{
            flexDirection: 'column',
            gap: '$6',
          }}
        >
          <CreateAccessPointFormBody />
        </Flex>
      </Card.Body>
    </Card.Container>
  );
};
