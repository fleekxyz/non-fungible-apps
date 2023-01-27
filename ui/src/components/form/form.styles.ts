import { dripStitches } from '../../theme/stitches';
import { Flex } from '../layout';

const { styled } = dripStitches;
export abstract class FormStyles {
  static readonly Field = styled(Flex, {
    flexDirection: 'column',
  });

  static readonly Label = styled('label', {
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
    defaultVariants: {
      size: 'md',
    },
  });

  static readonly ErrorMessage = styled('span', {
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
}