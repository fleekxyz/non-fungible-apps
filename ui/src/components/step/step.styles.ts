import { Flex } from '@/components';
import { styled } from '@/theme';

export const StepStyles = {
  Container: styled(Flex, {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '$full',
    gap: '$6',

    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'center',
    },

    '@media (min-width: 1024px)': {
      gap: '$34',
    },
  }),
  Indicator: styled(Flex, {
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '$106',
  }),
};
