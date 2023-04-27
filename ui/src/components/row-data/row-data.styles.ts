import { Flex, Text } from '@/components';
import { styled } from '@/theme';

import { IconStyles } from '../core/icon/icon.styles';

export const RowDataStyles = {
  Container: styled(Flex, {
    justifyContent: 'space-between',
  }),
  Text: {
    Container: styled(Flex, {
      alignItems: 'center',
      maxWidth: '60%',
      gap: '$2',

      [`${IconStyles.Container}`]: {
        fontSize: '$2xl',
      },
    }),
    Label: styled(Text, {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }),
  },
};
