import React, { forwardRef } from 'react';

import { IconName } from '../icon';
import { InputIconStyled, InputStyled, TextareaStyled } from './input.styles';
import { StyledInputFile } from './input-file';

export const Textarea = TextareaStyled;

export const LogoFileInput = StyledInputFile;

type InputProps = {
  leftIcon?: IconName;
  css?: string; //tailwind css
} & React.ComponentPropsWithRef<typeof InputStyled>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { leftIcon, css, ...ownProps } = props;

  return (
    <div className={`relative ${css ? css : ''}`}>
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
