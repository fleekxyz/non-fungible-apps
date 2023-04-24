import React from 'react';

import { forwardStyledRef } from '@/theme';

import {
  InputGroupStyled,
  InputIconStyled,
  InputStyled,
  TextareaStyled,
} from './input.styles';
import { StyledInputFile } from './input-file';

export const Textarea = TextareaStyled;

export const LogoFileInput = StyledInputFile;

type InputGroupProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithRef<typeof InputGroupStyled>;

export const InputGroup = forwardStyledRef<HTMLDivElement, InputGroupProps>(
  ({ children, ...props }, ref) => {
    return (
      <InputGroupStyled ref={ref} {...props}>
        {children}
      </InputGroupStyled>
    );
  }
);

export const InputLeftAddon = InputIconStyled;

export const Input = InputStyled;
