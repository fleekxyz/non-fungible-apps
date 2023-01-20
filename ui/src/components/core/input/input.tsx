import { Flex } from '../../layout';
import { forwardRef } from 'react';
import { StyledErrorMessage } from './input-error-message';
import { StyledInputLabel } from './input-label';
import { InputProps, StyledInput } from './input.styled';

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
    <Flex css={{ flexDirection: 'column' }}>
      {label && (
        <StyledInputLabel {...ownProps}>
          {label}
          {required && ' *'}
        </StyledInputLabel>
      )}
      <StyledInput
        ref={ref}
        {...ownProps}
        css={{
          width: type === 'file' ? '$20' : ownProps.width,
          height: type === 'file' ? '$20' : ownProps.height,
        }}
        type={type}
      />
      {errorMessage && (
        <StyledErrorMessage {...ownProps}>{errorMessage}</StyledErrorMessage>
      )}
    </Flex>
  );
});
