import { Card, Flex, Icon, IconButton } from '@/components';
import { forwardStyledRef } from '@/theme';

import { CardStyles } from '../card.styles';
import { CustomCardStyles as S } from './custom-card.styles';

export const CustomCardContainer = S.Container;

export abstract class CustomCardHeader {
  static readonly Default = forwardStyledRef<
    HTMLHeadingElement,
    CustomCard.HeadingProps
  >(({ title, onClickBack, ...props }, ref) => {
    return (
      <Card.Header ref={ref} {...props}>
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
  });

  static readonly Success = forwardStyledRef<
    HTMLHeadingElement,
    Omit<CustomCard.HeadingProps, 'onClickBack'>
  >(({ title, ...props }, ref) => {
    return (
      <Card.Header ref={ref} {...props}>
        <Flex css={{ gap: '$2' }}>
          <Icon
            name="check-circle"
            css={{ color: '$green11', fontSize: '$xl' }}
          />
          <S.Title.Text>{title}</S.Title.Text>
        </Flex>
      </Card.Header>
    );
  });
}

export namespace CustomCard {
  export type ContainerProps = React.ComponentProps<typeof S.Container>;

  export type HeadingProps = {
    title: string;
    onClickBack?: () => void;
  } & React.ComponentProps<typeof CardStyles.Header>;
}
