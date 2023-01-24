import { dripStitches } from '../../../theme/stitches';

const { styled } = dripStitches;

export const StyledErrorMessage = styled('span', {
  color: '$red11',
  fontSize: '0.625rem',

  variants: {
    size: {
      lg: {
        fontSize: '$sm',
      },
    },
  },
});
