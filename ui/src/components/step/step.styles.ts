import { Flex } from '@/components';
import { styled } from '@/theme';

export const StepStyles = {
  Container: styled(Flex, {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$6',

    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'center',
      //   gap: '$34',
    },

    '@media (min-width: 1024px)': {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: '$34',
    },
  }),
};
