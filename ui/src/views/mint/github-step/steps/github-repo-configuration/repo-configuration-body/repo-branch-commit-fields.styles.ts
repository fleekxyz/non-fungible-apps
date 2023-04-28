import { Text } from '@/components';
import { styled } from '@/theme';

export const TextStyles = styled(Text, {
  maxWidth: '12.5rem',

  '@media (min-width: 375px)': {
    maxWidth: '17rem',
  },
  '@media (min-width: 425px)': {
    maxWidth: '18rem',
  },
});
