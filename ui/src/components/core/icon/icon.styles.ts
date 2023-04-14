import { styled } from '@/theme';

export abstract class IconStyles {
  static readonly Container = styled('span', {
    transition: 'transform $default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    variants: {
      size: {
        sm: {
          fontSize: '$md',
        },
        md: {
          fontSize: '$2xl',
        },
        lg: {
          fontSize: '$3xl',
        },
      },

      rotate: {
        true: {
          transform: 'rotate(-180deg)',
        },
      },
    },

    defaultVariants: {
      rotate: false,
    },
  });

  static readonly Custom = styled('svg');
}

export namespace IconStyles {
  export type CustomProps = React.ComponentProps<typeof IconStyles.Custom>;
}
