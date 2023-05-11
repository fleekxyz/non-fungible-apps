import { Flex } from '@/components';
import { styled } from '@/theme';

export const MintStyles = {
  Container: styled(Flex, {
    height: '100%',
    justifyContent: 'center',

    '@md': {
      //to align on center
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },

    '@lg': {
      flexDirection: 'row',
    },
  }),
};
