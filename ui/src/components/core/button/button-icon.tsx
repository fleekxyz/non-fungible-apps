import * as React from 'react';

import {
  ButtonIconSpanProps,
  StyledButtonIconSpan,
} from './button-icon.styles';

export const ButtonIcon: React.FC<ButtonIconSpanProps> = (props) => {
  const { children, className, ...rest } = props;

  const _children = React.isValidElement(children)
    ? React.cloneElement(children, {
        'aria-hidden': true,
        focusable: false,
      })
    : children;

  return (
    <StyledButtonIconSpan {...rest} className={className}>
      {_children}
    </StyledButtonIconSpan>
  );
};
