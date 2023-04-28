import { Card, Icon, IconButton, Stepper } from '@/components';

export const APRecordCardHeader: React.FC = () => {
  const { prevStep } = Stepper.useContext();

  return (
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
  );
};
