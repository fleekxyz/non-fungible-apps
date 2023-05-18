import { Flex } from '@/components';
import { styled } from '@/theme';

export const MintStyles = {
  Container: styled(Flex, {
    height: '100%',
    justifyContent: 'center',
    // position: 'relative',
    // top: 'calc(85vh / 4)',

    '@lg': {
      flexDirection: 'row',
    },
  }),
};
