import { Card, Icon, IconButton } from '@/components';

type MintCardHeaderProps = {
  title: string;
  onClickBack: () => void;
};

export const MintCardHeader: React.FC<MintCardHeaderProps> = ({
  title,
  onClickBack,
}: MintCardHeaderProps) => {
  return (
    <Card.Heading
      title={title}
      leftIcon={
        <IconButton
          aria-label="Add"
          colorScheme="gray"
          variant="link"
          icon={<Icon name="back" />}
          css={{ mr: '$2' }}
          onClick={onClickBack}
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
