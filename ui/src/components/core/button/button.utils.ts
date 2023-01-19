import { CSS } from '@stitches/react';

export type ButtonColor = 'gray' | 'blue';
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

export type GetButtonCompoundVariantOptions = {
  color?: ButtonColor;
  variant?: ButtonVariant;
};

export const getButtonCompoundVariant = ({
  color = 'gray',
  variant = 'solid',
}: GetButtonCompoundVariantOptions): CSS => {
  switch (variant) {
    case 'solid':
      return {
        color: 'white',
        transition: 'all 200ms',
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
        transition: 'all 200ms',
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
        transition: 'all 200ms',
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
        transition: 'all 200ms',

        '&:hover, &:focus, &:active': {
          color: `$slate12`,
        },
        '&:hover': {
          backgroundColor: `$${color}4`,
        },
        '&:focus, &:active': {
          backgroundColor: `$${color}3`,
        },

        '&:disabled': {
          backgroundColor: `initial`,
          '&:hover': {
            color: `$${color}11`,
            backgroundColor: `initial`,
          },
          '& img, & svg': {
            filter: 'grayscale(100%)',
          },
        },
      };

    default:
      return {};
  }
};
