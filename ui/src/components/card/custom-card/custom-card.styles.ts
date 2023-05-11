import { Card, Flex } from '@/components';
import { styled } from '@/theme';

export const CustomCardStyles = {
  Container: styled(Card.Container, {
    maxWidth: '$107h',
  }),
  Title: {
    Container: styled(Flex, {
      justifyContent: 'space-between',
    }),
    Text: styled('h3', {
      color: '$slate12',
      fontSize: '$xl',
      fontWeight: '$medium',
    }),
  },
};
