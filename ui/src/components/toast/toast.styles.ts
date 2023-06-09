import * as ToastLib from '@radix-ui/react-toast';

import { keyframes, styled } from '@/theme';

import { Icon, IconButton } from '../core';
import { Flex } from '../layout';
import { IconStyles } from '../core/icon/icon.styles';

const KeyFrames = {
  hide: keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
  }),
  show: keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  }),
};

export const ViewportPadding = '$md';
export const DismissTimeout = 200;

export const ToastStyles = {
  Provider: ToastLib.Provider,

  Root: styled(ToastLib.Root, {
    padding: '$4 $5',
    borderRadius: '$lg',
    borderWidth: '$default',
    maxWidth: '$128',

    variants: {
      variant: {
        error: {
          backgroundColor: '$red3',
          borderColor: '$red6',
          color: '$red11',
        },
        success: {
          backgroundColor: '$green3',
          borderColor: '$green6',
          color: '$green11',
        },
      },
    },

    '@media (prefers-reduced-motion: no-preference)': {
      '&[data-state="open"]': {
        animation: `${KeyFrames.show} 750ms `,
      },
      '&[data-state="closed"]': {
        animation: `${KeyFrames.hide} ${DismissTimeout}ms ease-in`,
      },
    },
  }),
  Body: styled(ToastLib.Description, {
    fontSize: '$md',
    fontWeight: '$normal',
    mr: '$5',
  }),
  Close: ToastLib.Close,
  CloseButton: styled(IconButton, {
    variants: {
      colorScheme: {
        error: {
          color: '$red11 !important',
        },
        success: {
          color: '$green11 !important',
        },
      },
    },
  }),
  Viewport: styled(ToastLib.Viewport, {
    py: '$14',
    listStyleType: 'none',
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    zIndex: '$toast',
    minWidth: '250px',
  }),
  Layout: styled(Flex, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  Icon: styled(Icon, {
    fontSize: '1.25rem',
    marginRight: '$2h',
  }),
  Content: styled(Flex),
};
