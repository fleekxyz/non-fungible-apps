import { Link } from 'react-router-dom';

import { dripStitches } from '@/theme';

const { styled } = dripStitches;

export const NFACardStyles = {
  Container: styled(Link, {
    display: 'flex',
    flexDirection: 'column',
    width: '14.6875rem',
    padding: 0,
    overflow: 'hidden',
    cursor: 'pointer',
    border: '1px solid $slate6',
    borderRadius: '$lg',

    svg: {
      position: 'relative',
      transition: 'transform 0.4s ease-in-out 0s',
    },
    '&:hover': {
      svg: {
        transform: 'scale(1.12)',
      },
    },
  }),
  Body: styled('div', {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    padding: '$3 $4',
    gap: '$2',
    borderTop: '1px solid $slate6',
    backgroundColor: '$black', // TODO: are we going to add black as theme color?
  }),
  Badge: styled('span', {
    height: 'fit-content',
    width: 'fit-content',
    fontSize: '$xs',
    fontWeight: '$bold',
    padding: '$0h $2',
    borderRadius: '$full',

    variants: {
      verified: {
        true: {
          backgroundColor: '$green3',
          color: '$green11',
        },
        false: {
          backgroundColor: '$red3',
          color: '$red11',
        },
      },
    },
  }),
  Title: styled('h1', {
    all: 'unset',
    fontSize: '$xl',
    fontWeight: '$medium',
    lineHeight: 1.4,
  }),
  Content: styled('span', {
    all: 'unset',
    color: '$slate11',
    fontSize: '$sm',
    lineHeight: 1.43,

    variants: {
      highlight: {
        true: {
          color: '$slate12',
        },
      },
    },
  }),
};
