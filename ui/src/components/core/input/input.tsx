import { Flex } from '../../layout';
import { forwardRef } from 'react';
import { StyledErrorMessage } from './input-error-message';
import { StyledInputLabel } from './input-label';
import { InputProps, StyledInput } from './input.styled';
import { InputFileStyled } from './input-file';

export const Input = forwardRef<InputProps, 'input'>((props, ref) => {
  const {
    label,
    errorMessage,
    rightIcon,
    leftIcon,
    type,
    required,
    ...ownProps
  } = props;

  return (
    <Flex
      css={{
        flexDirection: 'column',
        width: type === 'file' ? '$22' : ownProps.width,
      }}
    >
      {label && (
        <StyledInputLabel {...ownProps}>
          {label}
          {required && ' *'}
        </StyledInputLabel>
      )}
      {type === 'file' ? (
        <InputFileStyled {...ownProps} />
      ) : (
        <StyledInput ref={ref} {...ownProps} type={type} />
      )}

      {errorMessage && (
        <StyledErrorMessage {...ownProps}>{errorMessage}</StyledErrorMessage>
      )}
    </Flex>
  );
});
