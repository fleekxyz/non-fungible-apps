import { CSS } from '@stitches/react';

import { styled } from '@/theme';

type StyledButtonProps = React.ComponentPropsWithRef<typeof StyledButton>;
export interface ButtonProps extends StyledButtonProps {
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;
  /**
   * If `true`, the button will be styled in its active state.
   */
  isActive?: boolean;
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * The label to show in the button when `isLoading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string;
  /**
   * If `true`, the button will take up the full width of its container.
   */
  isFullWidth?: boolean;
  /**
   * The html button type to use.
   */
  type?: 'button' | 'reset' | 'submit';
  /**
   * If added, the button will show an icon before the button's label.
   * @type React.ReactElement
   */
  leftIcon?: React.ReactElement;
  /**
   * If added, the button will show an icon after the button's label.
   * @type React.ReactElement
   */
  rightIcon?: React.ReactElement;
  /**
   * If added, the button will show an icon on top side from the button's label.
   * @type React.ReactElement
   */
  topIcon?: React.ReactElement;
  /**
   * If added, the button will show an icon on bottom side from the button's label.
   * @type React.ReactElement
   */
  bottomIcon?: React.ReactElement;
  /**
   * Replace the spinner component when `isLoading` is set to `true`
   * @type React.ReactElement
   */
  spinner?: React.ReactElement;
  /**
   * It determines the placement of the spinner when isLoading is true
   * @default "start"
   */
  spinnerPlacement?: 'start' | 'end';
}

export type ButtonColor = 'gray' | 'blue';
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

export type GetButtonCompoundVariantOptions = {
  color?: ButtonColor;
  variant?: ButtonVariant;
};

const getButtonCompoundVariant = ({
  color = 'gray',
  variant = 'solid',
}: GetButtonCompoundVariantOptions): CSS => {
  switch (variant) {
    case 'solid':
      return {
        color: 'white',
        transition: '$all-200',
        backgroundColor: `$${color}9`,
        '&:focus, &:hover': {
          backgroundColor: `$${color}10`,
        },
        '&:focus, &:active': {
          backgroundColor: `$${color}11`,
        },
      };
    case 'outline':
      return {
        color: `$${color}11`,
        transition: '$all-200',
        backgroundColor: `$${color}4`,
        '&:hover': {
          backgroundColor: `$${color}5`,
        },
        '&:focus, &:active': {
          backgroundColor: `$${color}6`,
        },
      };
    case 'link':
      return {
        color: `$${color}11`,
        transition: '$all-200',
        height: 'auto',
        px: '0',
        '&:hover, &:focus': {
          textDecoration: 'underline',
          color: `$${color}12`,
          '&:disabled': {
            textDecoration: 'none',
          },
        },
      };
    case 'ghost':
      return {
        color: `$slate11`,
        transition: '$all-200',

        '&:hover, &:focus, &:active': {
          color: `$slate12`,
        },
        '&:hover': {
          backgroundColor: `$${color}4`,
        },
        '&:focus, &:active': {
          backgroundColor: `$${color}3`,
        },
      };

    default:
      return {};
  }
};

export const StyledButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  userSelect: 'none',
  fontWeight: '$normal',
  width: 'auto',
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: '0.4',
    backgroundColor: '$slate3',
  },

  variants: {
    size: {
      sm: {
        borderRadius: '$md',
        fontSize: '$xs',
        p: '$1 $3',
      },
      md: {
        borderRadius: '$lg',
        fontSize: '$sm',
        p: '$3 $3h',
      },
      lg: {
        borderRadius: '$xl',
        fontSize: '$md',
        p: '$4 $5',
      },
    },
    variant: {
      solid: {
        color: '$gray1',
      },
      ghost: {},
      outline: {},
      link: {},
      unstyled: {},
    },
    colorScheme: {
      gray: {},
      blue: {},
      red: {},
    },
  },
  compoundVariants: [
    {
      colorScheme: 'gray',
      variant: 'solid',
      css: getButtonCompoundVariant({ color: 'gray', variant: 'solid' }),
    },
    {
      colorScheme: 'blue',
      variant: 'solid',
      css: getButtonCompoundVariant({ color: 'blue', variant: 'solid' }),
    },
    {
      colorScheme: 'gray',
      variant: 'outline',
      css: getButtonCompoundVariant({ color: 'gray', variant: 'outline' }),
    },
    {
      colorScheme: 'blue',
      variant: 'outline',
      css: getButtonCompoundVariant({ color: 'blue', variant: 'outline' }),
    },
    {
      colorScheme: 'gray',
      variant: 'ghost',
      css: getButtonCompoundVariant({ color: 'gray', variant: 'ghost' }),
    },
    {
      colorScheme: 'blue',
      variant: 'ghost',
      css: getButtonCompoundVariant({ color: 'blue', variant: 'ghost' }),
    },
    {
      colorScheme: 'gray',
      variant: 'link',
      css: getButtonCompoundVariant({ color: 'gray', variant: 'link' }),
    },
    {
      colorScheme: 'blue',
      variant: 'link',
      css: getButtonCompoundVariant({ color: 'blue', variant: 'link' }),
    },
  ],
  defaultVariants: {
    colorScheme: 'gray',
    variant: 'outline',
    size: 'md',
  },
});
