import { Button, Card, Grid } from '@/components';
import { NFAPreview } from '@/components';

import { useMintFormContext } from '../nfa-step/form-step';

type NftCardProps = {
  title: string;
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  message: string;
  buttonText: string;
  leftIconButton?: React.ReactNode;
  onClick?: () => void;
  isLoading: boolean;
};

export const NftCard: React.FC<NftCardProps> = ({
  title,
  leftIcon,
  rightIcon,
  message,
  buttonText,
  leftIconButton,
  onClick,
  isLoading,
}: NftCardProps) => {
  const size = '26.5rem';
  const {
    form: {
      appName: {
        value: [appName],
      },
      appLogo: {
        value: [appLogo],
      },
      logoColor: {
        value: [logoColor],
      },
      ens: {
        value: [ens],
      },
    },
  } = useMintFormContext();

  return (
    <Card.Container css={{ maxWidth: '$107h', p: '$0' }}>
      <NFAPreview
        color={logoColor}
        logo={appLogo}
        name={appName}
        ens={ens}
        size={size}
        className="rounded-t-xhl"
      />
      <Card.Body css={{ p: '$7' }}>
        <Grid css={{ rowGap: '$6' }}>
          <Card.Heading
            title={title}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
          />
          <span className="text-slate11 text-sm">{message}</span>
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={onClick}
            leftIcon={leftIconButton}
            isLoading={isLoading}
            isDisabled={isLoading || !onClick}
          >
            {buttonText}
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
