import React from 'react';

import { ButtonProps } from '.';
import { ButtonIcon } from './button-icon';

export type ButtonContentProps = Pick<
  ButtonProps,
  'leftIcon' | 'rightIcon' | 'children'
>;

export const ButtonContent: React.FC<ButtonContentProps> = (props) => {
  const { leftIcon, rightIcon, children } = props;

  const midNode = (
    <>
      {leftIcon && <ButtonIcon>{leftIcon}</ButtonIcon>}
      {children}
      {rightIcon && <ButtonIcon>{rightIcon}</ButtonIcon>}
    </>
  );

  return midNode;
};
