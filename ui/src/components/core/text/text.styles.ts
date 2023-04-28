import { styled } from '@/theme';

export const Text = styled('span', {
  variants: {
    ellipsis: {
      true: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
  },
});
