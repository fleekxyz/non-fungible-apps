import { dripStitches } from '../../../theme'; //TODO replace with absolute path
import React, { HTMLAttributes, useMemo } from 'react';

import {
  ButtonSpinnerProps,
  StyledButtonSpinnerBox,
  StyledButtonSpinnerDot,
  StyledButtonSpinnerDotsBox,
} from './button-spinner.styled';

export const ButtonSpinner: React.FC<ButtonSpinnerProps> = (props) => {
  const {
    label,
    placement,
    spacing = '$2',
    children,
    className,
    ...rest
  } = props;

  const marginProp = placement === 'start' ? 'marginRight' : 'marginLeft';

  const spinnerStyles = useMemo(
    () => ({
      position: label ? 'relative' : 'absolute',
      [marginProp]: label ? spacing : 0,
    }),
    [label, marginProp, spacing]
  );

  return (
    <StyledButtonSpinnerBox className={className} css={spinnerStyles} {...rest}>
      {children || <ButtonSpinnerDots />}
    </StyledButtonSpinnerBox>
  );
};

const { keyframes } = dripStitches;

const blink = keyframes({
  '0%': { opacity: 0.2 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0.2 },
});

const ButtonSpinnerDots: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <StyledButtonSpinnerDotsBox {...props}>
      <StyledButtonSpinnerDot
        css={{
          animation: `${blink} infinite linear 2s`,
          animationDelay: '0ms',
        }}
      />
      <StyledButtonSpinnerDot
        css={{
          animation: `${blink} infinite linear 2s`,
          animationDelay: '250ms',
        }}
      />
      <StyledButtonSpinnerDot
        css={{
          animation: `${blink} infinite linear 2s`,
          animationDelay: '500ms',
        }}
      />
    </StyledButtonSpinnerDotsBox>
  );
};
