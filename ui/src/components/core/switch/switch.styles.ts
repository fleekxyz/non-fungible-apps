import { Switch } from '@headlessui/react';

import { styled } from '@/theme';

export const SwitchStyles = {
  Wrapper: styled(Switch, {
    position: 'relative',
    display: 'inline-flex',
    height: '2rem',
    width: '4.625rem',
    flexShrink: 0,
    cursor: 'pointer',
    borderRadius: '$full',
    borderWidth: '0.125rem',
    borderColor: 'transparent',

    transitionProperty:
      'color, background-color, border-color, text-decoration-color, fill, stroke',

    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '200ms',

    '&:focus': {
      outline: '2px solid transparent',
      outlineOffset: '2px',
    },

    variants: {
      isChecked: {
        true: {
          backgroundColor: '$green4',
        },
        false: {
          backgroundColor: '$red4',
        },
      },
    },
  }),
  Text: styled('span', {
    position: 'absolute',
    top: '25%',
    fontSize: '$sm',

    variants: {
      checked: {
        true: {
          right: '0.75rem',
          color: '$green11',
        },
        false: {
          left: '1rem',
          color: '$red11',
        },
      },
    },
  }),
  Dot: styled('span', {
    position: 'absolute',
    top: '5px',
    left: '5px',
    pointerEvents: 'none',
    display: 'inline-block',
    height: '1.25rem',
    width: '1.25rem',
    borderRadius: '$full',

    transitionProperty:
      'color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter',

    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '200ms',

    variants: {
      checked: {
        true: {
          backgroundColor: '$green11',
          transform: 'translateX(0px)',
        },
        false: {
          backgroundColor: '$red11',
          transform: 'translateX(2.625rem)',
        },
      },
    },
  }),
};
