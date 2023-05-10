import {
  Card,
  CustomCardContainer,
  CustomCardHeader,
  Flex,
  Icon,
} from '@/components';
import { styled } from '@/theme';

export const GithubRepositorySelectionStyles = {
  Card: {
    Wrapper: styled(CustomCardContainer, {
      maxHeight: '$95h',
      pr: '$3h',
    }),
    Header: styled(CustomCardHeader.Default, {
      pr: '$3h',
    }),
    Body: styled(Card.Body, {
      pt: '$4',
    }),
  },
  Container: styled(Flex, {
    flexDirection: 'column',
    gap: '$2',
  }),
  Row: styled(Flex, {
    gap: '$4',
    pr: '$3h',
    position: 'relative',
  }),
  Group: {
    Icon: styled(Icon, {
      fontSize: '$lg',
    }),
  },
};
