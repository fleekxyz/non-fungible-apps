import { StyledButton } from '@/components/core';
import { styled } from '@/theme';

import { Flex } from '../flex.styles';

export const NavBarStyles = {
  Container: styled('header', {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '$black',
    zIndex: '$sticky',
    height: '$22',
    overflow: 'hidden', // TODO: this must be worked on for responsive layout
  }),

  Content: styled('div', {
    width: '100vw',
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
      backgroundColor: '#00000080',
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
