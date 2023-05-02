import { Text } from '@/components';
import { keyframes, styled } from '@/theme';

const Loading = keyframes({
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
  '100%': {
    opacity: 1,
  },
});

export const ResolvedAddressStyles = {
  Container: styled(Text, {
    '&[data-loading="true"]': {
      animation: `${Loading} 1s ease-in-out infinite`,
    },
  }),
};
