import { Flex, Text } from '@/components';
import { styled } from '@/theme';

export const RowDataStyles = {
  Container: styled(Flex, {
    justifyContent: 'space-between',
  }),
  Text: {
    Container: styled(Flex, {
      alignItems: 'center',
      maxWidth: '65%',
      gap: '$2',
    }),
    Label: styled(Text, {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }),
  },
};
