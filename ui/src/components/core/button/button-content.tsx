import React from 'react';

import { ButtonProps } from '.';
import {
  StyledButtonContentFlex,
  StyledButtonContentGrid,
} from './button-content.styled';
import { ButtonIcon } from './button-icon';

export type ButtonContentProps = Pick<
  ButtonProps,
  | 'leftIcon'
  | 'rightIcon'
  | 'topIcon'
  | 'bottomIcon'
  | 'children'
  | 'iconSpacing'
>;

export const ButtonContent: React.FC<ButtonContentProps> = (props) => {
  const {
    leftIcon,
    rightIcon,
    topIcon,
    bottomIcon,
    children,
    iconSpacing = '1h',
  } = props;

  const midNode = (
    <>
      {leftIcon && (
        <ButtonIcon css={{ marginRight: `$${iconSpacing}` }}>
          {leftIcon}
        </ButtonIcon>
      )}
      {children}
      {rightIcon && (
        <ButtonIcon css={{ marginLeft: `$${iconSpacing}` }}>
          {rightIcon}
        </ButtonIcon>
      )}
    </>
  );

  if (!topIcon && !bottomIcon) {
    return midNode;
  }

  return (
    <StyledButtonContentGrid>
      {topIcon && <ButtonIcon>{topIcon}</ButtonIcon>}
      <StyledButtonContentFlex>{midNode}</StyledButtonContentFlex>
      {bottomIcon && <ButtonIcon>{bottomIcon}</ButtonIcon>}
    </StyledButtonContentGrid>
  );
};
