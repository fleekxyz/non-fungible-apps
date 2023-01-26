// import { Flex } from '../../layout';
// import { forwardRef } from 'react';
// import { StyledErrorMessage } from './input-error-message';
// import { StyledInputLabel } from './input-label';
// import { InputProps, StyledInput } from './input.styled';
// import { InputFileStyled } from './input-file';

// export const Input = forwardRef<InputProps, 'input'>((props, ref) => {
//   const {
//     label,
//     errorMessage,
//     rightIcon,
//     leftIcon,
//     type,
//     required,
//     ...ownProps
//   } = props;

//   return (
//     <Flex
//       css={{
//         flexDirection: 'column',
//         width: type === 'file' ? '$22' : ownProps.width,
//       }}
//     >
//       {label && (
//         <StyledInputLabel {...ownProps}>
//           {label}
//           {required && ' *'}
//         </StyledInputLabel>
//       )}
//       {type === 'file' ? (
//         <InputFileStyled {...ownProps} />
//       ) : (
//         <StyledInput ref={ref} {...ownProps} type={type} />
//       )}

//       {errorMessage && (
//         <StyledErrorMessage {...ownProps}>{errorMessage}</StyledErrorMessage>
//       )}
//     </Flex>
//   );
// });
import { dripStitches } from '../../../theme/stitches';
import { StyledInputFile } from './input-file';
const { styled } = dripStitches;

const styles = {
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
};

export const Input = styled('input', styles);

export const Textarea = styled('textarea', styles);

export const File = StyledInputFile;
