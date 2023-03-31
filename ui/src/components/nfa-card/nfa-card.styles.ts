import { dripStitches } from '@/theme';

const { styled } = dripStitches;

export const NFACardStyles = {
  Container: styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '14.6875rem',
  }),
  Preview: styled('image', {
    width: '100%',
    height: 'auto',
  }),
  Body: styled('div', {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem',
    gap: '0.5rem',
  }),
  Badge: styled('span', {
    variants: {
      verified: {
        true: {},
        false: {},
      },
    },
  }),
  Title: styled('h1', {
    all: 'unset',
  }),
  Content: styled('span', {
    all: 'unset',

    variants: {
      highlight: {
        true: {},
      },
    },
  }),
};
