import { dripStitches } from '@/theme';
import * as ToastLib from '@radix-ui/react-toast';
import { Icon, IconButton } from '../core';
import { Flex } from '../layout';

const { styled, keyframes } = dripStitches;

export abstract class ToastStyles {
  static readonly Provider = ToastLib.Provider;

  static readonly DismissTimeout = 100;

  static readonly ViewportPadding = '$md';

  static readonly KeyFrames = {
    hide: keyframes({
      '0%': { opacity: 1 },
      '100%': { opacity: 0 },
    }),
    slideIn: keyframes({
      from: { transform: `translateX(calc(100% + ${this.ViewportPadding}))` },
      to: { transform: 'translateX(0)' },
    }),
    swipeOut: keyframes({
      from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
      to: { transform: `translateX(calc(100% + ${this.ViewportPadding}))` },
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
        animation: `${this.KeyFrames.slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
      },
      '&[data-state="closed"]': {
        animation: `${this.KeyFrames.hide} ${this.DismissTimeout}ms ease-in`,
      },
      '&[data-swipe="move"]': {
        transform: 'translateX(var(--radix-toast-swipe-move-x))',
      },
      '&[data-swipe="cancel"]': {
        transform: 'translateX(0)',
        transition: 'transform 200ms ease-out',
      },
      '&[data-swipe="end"]': {
        animation: `${this.KeyFrames.swipeOut} 100ms ease-out`,
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
