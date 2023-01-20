import { dripStitches } from '../../../theme/stitches';

const { styled } = dripStitches;

export const StyledInputLabel = styled('label', {
  color: '$slate11',

  '&:disabled': {
    color: '$slate8',
  },
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
