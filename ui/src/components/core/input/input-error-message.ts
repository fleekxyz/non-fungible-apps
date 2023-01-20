import { dripStitches } from '../../../theme/stitches';

const { styled } = dripStitches;

export const StyledErrorMessage = styled('span', {
  color: '$red9',
  variants: {
    size: {
      sm: {
        fontSize: '$xs', //TODO check with royce font size
      },
      md: {
        fontSize: '$xs',
      },
      lg: {
        fontSize: '$md',
      },
    },
  },
});
