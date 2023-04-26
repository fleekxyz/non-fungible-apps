import { StyledButton } from '@/components/core';
import { alphaColor, styled } from '@/theme';

import { Flex } from '../flex.styles';

export const NavBarStyles = {
  Container: styled('header', {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    zIndex: '$sticky',
    height: '$22',
    overflow: 'hidden', // TODO: this must be worked on for responsive layout

    '&:after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: alphaColor('black', 0.8),
      backdropFilter: 'blur(4px)',
      zIndex: -1,
    },
  }),

  Content: styled('div', {
    width: '100%',
    maxWidth: '$7xl',
    margin: '0 auto',
    alignItems: 'center',
    padding: '$6',
    gap: '$3',

    display: 'grid',
    gridTemplateAreas: '"logo navigation wallet menu"',
    gridTemplateColumns: 'auto 1fr auto',
  }),

  Navigation: {
    Container: styled(Flex, {
      gridArea: 'navigation',
      gap: '$10',
      justifyContent: 'center',

      fontSize: '$lg',

      variants: {
        stacked: {
          true: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: '$4',

            [`${StyledButton}`]: {
              fontSize: '$lg',
            },
          },
        },
      },
    }),

    Button: styled(StyledButton, {
      variants: {
        active: {
          true: {
            color: '$slate12 !important',
          },
        },
      },
    }),
  },

  Sidebar: {
    Content: styled(Flex, {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      padding: '$6',
      minWidth: '40vw',
      zIndex: '$sticky',
      backgroundColor: '$black',
      transition: 'transform 0.3s ease-in-out',
      borderLeft: '1px solid $slate6',

      variants: {
        open: {
          true: {
            transform: 'translateX(0%)',
          },
          false: {
            transform: 'translateX(100%)',
          },
        },
      },
    }),

    Backdrop: styled('div', {
      position: 'fixed',
      inset: 0,
      zIndex: '$sticky',
      backgroundColor: alphaColor('black', 0.5),
      display: 'none',
      transition: 'opacity 0.3s ease-in-out',

      variants: {
        open: {
          true: {
            display: 'block',
            backdropFilter: 'blur(4px)',
          },
        },
      },
    }),
  },

  Logo: {
    Wrapper: styled(Flex, {
      gridArea: 'logo',
      cursor: 'pointer',
    }),
  },
};
