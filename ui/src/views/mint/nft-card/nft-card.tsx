import {
  Button,
  Card,
  CustomCardContainer,
  CustomCardHeader,
  Flex,
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
  const size = '100%';
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
    <CustomCardContainer
      css={{
        p: '$0',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        overflow: 'hidden',
      }}
    >
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
        <Flex css={{ gap: '$6', flexDirection: 'column' }}>
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
        </Flex>
      </Card.Body>
    </CustomCardContainer>
  );
};
