import React, { forwardRef, useMemo } from 'react';

import { Button } from './button';
import { ButtonProps } from './button.styles';

type OmittedProps =
  | 'leftIcon'
  | 'isFullWidth'
  | 'rightIcon'
  | 'loadingText'
  | 'iconSpacing'
  | 'spinnerPlacement';

type BaseButtonProps = Omit<ButtonProps, OmittedProps>;

export interface IconButtonProps extends BaseButtonProps {
  /**
   * The icon to be used in the button.
   * @type React.ReactElement
   */
  icon?: React.ReactElement;
  /**
   * If `true`, the button will be perfectly round. Else, it'll be slightly round
   */
  isRound?: boolean;
  /**
   * A11y: A label that describes the button
   */
  'aria-label': string;
}

export const IconButton = forwardRef<IconButtonProps, 'button'>(
  function IconButton(props, ref) {
    const {
      icon,
      children,
      isRound,
      'aria-label': ariaLabel,
      size = 'md',
      ...rest
    } = props;

    /**
     * Passing the icon as prop or children should work
     */
    const element = icon || children;
    const _children = React.isValidElement(element)
      ? React.cloneElement(element, {
          'aria-hidden': true,
          focusable: false,
        })
      : null;

    const { minWidth, fontSize } = useMemo(() => {
      const props = {
        sm: {
          fontSize: '$lg',
        },
        md: {
          fontSize: '$xl',
        },
        lg: {
          fontSize: '$2xl',
        },
      };

      return props[size as 'sm' | 'md' | 'lg'];
    }, [size]);

    return (
      <Button
        ref={ref}
        aria-label={ariaLabel}
        size={size}
        {...rest}
        css={{
          padding: 0,
          minWidth,
          fontSize,
          borderRadius: isRound ? '$full' : undefined,
          ...(rest.css ?? {}),
        }}
      >
        {_children}
      </Button>
    );
  }
);
