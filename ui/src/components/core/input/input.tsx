import React, { forwardRef } from 'react';

import { IconName } from '../icon';
import { InputIconStyled, InputStyled, TextareaStyled } from './input.styles';
import { StyledInputFile } from './input-file';

export const Textarea = TextareaStyled;

export const LogoFileInput = StyledInputFile;

type InputProps = {
  leftIcon?: IconName;
} & React.ComponentPropsWithRef<typeof InputStyled>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { leftIcon, ...ownProps } = props;

  return (
    <div className="relative flex-1">
      {leftIcon && (
        <InputIconStyled name={leftIcon} css={{ fontSize: '$lg' }} />
      )}
      <InputStyled
        {...props}
        ref={ref}
        css={{ ...(leftIcon && { pl: '$10' }), ...(ownProps.css || {}) }}
      />
    </div>
  );
});

Input.displayName = 'Input';
