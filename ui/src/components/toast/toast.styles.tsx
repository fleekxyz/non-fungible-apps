import * as ToastLib from '@radix-ui/react-toast';

import { dripStitches } from '@/theme';

import { Icon, IconButton } from '../core';
import { Flex } from '../layout';

const { styled, keyframes } = dripStitches;

export abstract class ToastStyles {
  static readonly Provider = ToastLib.Provider;

  static readonly DismissTimeout = 200;

  static readonly ViewportPadding = '$md';

  static readonly KeyFrames = {
    hide: keyframes({
      '0%': { opacity: 1 },
      '100%': { opacity: 0 },
    }),
    show: keyframes({
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    }),
  };

  static readonly Root = styled(ToastLib.Root, {
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
        animation: `${this.KeyFrames.show} 750ms `,
      },
      '&[data-state="closed"]': {
        animation: `${this.KeyFrames.hide} ${this.DismissTimeout}ms ease-in`,
      },
    },
  });

  static readonly Body = styled(ToastLib.Description, {
    fontSize: '$md',
    fontWeight: '$normal',
    mr: '$5',
  });

  static readonly Close = styled(ToastLib.Close, {});

  static readonly CloseButton = styled(IconButton, {
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
  });

  static readonly Viewport = styled(ToastLib.Viewport, {
    padding: '$14',

    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    zIndex: '$toast',
  });

  static readonly Layout = styled(Flex, {
    flexDirection: 'row',
    justifyContent: 'space-between',
  });

  static readonly Icon = styled(Icon, {
    fontSize: '$5',
    marginRight: '$2h',
  });

  static readonly Content = styled(Flex, {});
}
