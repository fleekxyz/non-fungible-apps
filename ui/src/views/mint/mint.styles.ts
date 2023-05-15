import { Flex } from '@/components';
import { styled } from '@/theme';

export const MintStyles = {
  Container: styled(Flex, {
    height: '100%',
    justifyContent: 'center',
    // minHeight: '85vh',

    '@lg': {
      flexDirection: 'row',
    },
  }),
};
