import { Button, Card, Grid } from '@/components';
import { SVGPreview } from './svg-preview';

type NftCardProps = {
  title: string;
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  message: string;
  buttonText: string;
  leftIconButton?: React.ReactNode;
  onClick: () => void;
};

export const NftCard: React.FC<NftCardProps> = ({
  title,
  leftIcon,
  rightIcon,
  message,
  buttonText,
  leftIconButton,
  onClick,
}) => {
  return (
    <Card.Container css={{ p: '$0' }}>
      <SVGPreview />
      <Card.Body css={{ p: '$7' }}>
        <Grid css={{ rowGap: '$6' }}>
          <Card.Heading
            title={title}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
          />
          {/* TODO replace for real price when integrate with wallet */}
          <span className="text-slate11 text-sm">{message}</span>
          {/* TODO add desabled when user doesnt have enough MATIC */}
          {/* TODO repalce for app name when connect with context */}
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={onClick}
            leftIcon={leftIconButton}
          >
            {buttonText}
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
