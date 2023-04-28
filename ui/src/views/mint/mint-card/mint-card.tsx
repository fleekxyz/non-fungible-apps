import { Card, Flex, Icon, IconButton } from '@/components';

import { MintCardStyles as S } from './mint-card.styles';

type MintCardHeaderProps = {
  title: string;
  onClickBack?: () => void;
};

export const MintCardHeader: React.FC<MintCardHeaderProps> = ({
  title,
  onClickBack,
}: MintCardHeaderProps) => {
  return (
    <Card.Header>
      <S.Title.Container>
        <Flex css={{ gap: '$2' }}>
          {onClickBack && (
            <IconButton
              aria-label="back"
              colorScheme="gray"
              variant="link"
              icon={<Icon name="back" />}
              onClick={onClickBack}
            />
          )}
          <S.Title.Text>{title}</S.Title.Text>
        </Flex>
        <IconButton
          aria-label="Add"
          colorScheme="gray"
          variant="link"
          icon={<Icon name="info" />}
        />
      </S.Title.Container>
    </Card.Header>
  );
};

export const MintCardContainer = S.Container;
