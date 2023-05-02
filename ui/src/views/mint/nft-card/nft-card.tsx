import {
  Button,
  Card,
  CustomCardContainer,
  CustomCardHeader,
  Grid,
  Text,
} from '@/components';
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
    <CustomCardContainer css={{ p: '$0' }}>
      <NFAPreview
        color={logoColor}
        logo={appLogo}
        name={appName}
        ens={ens}
        size={size}
        css={{
          bt: '1.25rem',
        }}
      />
      <Card.Body css={{ p: '$7' }}>
        <Grid css={{ rowGap: '$6' }}>
          <CustomCardHeader.Success title={title} />
          <Text css={{ color: '$slate11', fontSize: '$sm' }}>{message}</Text>
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
    </CustomCardContainer>
  );
};
