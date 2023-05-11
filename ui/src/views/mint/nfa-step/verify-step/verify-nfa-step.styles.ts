import { Card, Flex, Text } from '@/components';
import { styled } from '@/theme';

export const VerifyNfaStepStyles = {
  Body: {
    Container: styled(Flex, {
      flexDirection: 'column',
      gap: '$6',
    }),
    Text: styled(Text, {
      color: '$slate11',
      fontSize: '$sm',
    }),
    VerifyContainer: styled(Card.Text, {
      p: '$4',
      textAlign: 'left',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: '$lg',
    }),
  },
};
