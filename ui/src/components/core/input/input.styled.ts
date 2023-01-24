import { dripStitches } from '../../../theme/stitches';

type StyledInputProps = React.ComponentProps<typeof StyledInput>;
export interface InputProps extends StyledInputProps {
  /**
   * If is seted, show label
   * */
  label?: string;
  /**
   * If is seted, show error message
   */
  errorMessage?: string;
  /**
   * If added, the input will show an icon before the placeholder.
   * @type React.ReactElement
   */
  leftIcon?: React.ReactElement;
  /**
   * If added, the input will show an icon after the placeholder.
   * @type React.ReactElement
   */
  rightIcon?: React.ReactElement;
}

const { styled } = dripStitches;

export const StyledInput = styled('input', {
  all: 'unset',
  width: '100%',
  boxSizing: 'border-box',
  borderStyle: 'solid',
  minWidth: '$0',
  color: '$slate12',
  my: '$1h',

  transition: 'border-color 0.2s ease-in-out',
  borderWidth: '$default',
  borderColor: '$gray7',
  backgroundColor: 'transparent',
  '&:hover': {
    borderColor: '$gray8',
  },
  '&:focus': {
    outline: 'none',
    borderColor: '$blue9',
  },
  '&[aria-invalid=true], &[data-invalid]': {
    borderColor: '$red9',
  },
  '&:disabled': {
    color: '$slate8',
    borderColor: '$slate6',
    backgroundColor: '$slate2',
    '&::placeholder': {
      color: '$slate8',
    },
  },

  variants: {
    size: {
      sm: {
        borderRadius: '$md',
        fontSize: '$xs',
        lineHeight: '$4',
        p: '$1h',
      },
      md: {
        borderRadius: '$lg',
        fontSize: '$sm',
        p: '$3 $3h',
      },
      lg: {
        borderRadius: '$xl',
        fontSize: '$md',
        p: '$4 $5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
