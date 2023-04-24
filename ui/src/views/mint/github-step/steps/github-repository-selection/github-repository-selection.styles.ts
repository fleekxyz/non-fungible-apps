import { Card, Flex, Input, InputLeftAddon } from '@/components';
import { styled } from '@/theme';

export const GithubRepositorySelectionStyles = {
  Card: {
    Wrapper: styled(Card.Container, {
      maxWidth: '$107',
      maxHeight: '$95h',
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
  Input: {
    LeftAddon: styled(InputLeftAddon, {
      fontSize: '$lg',
    }),
    Input: styled(Input, {
      pl: '$10',
    }),
  },
};
