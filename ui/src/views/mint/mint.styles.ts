import { Flex } from '@/components';
import { styled } from '@/theme';

export const MintStyles = {
  Container: styled(Flex, {
    height: '100%',
    justifyContent: 'center',

    '@media (min-width: 1024px)': {
      flexDirection: 'row',
    },
  }),
};
