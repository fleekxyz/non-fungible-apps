import { styled } from '@/theme';

export const IndexedNFAStyles = {
  Grid: styled('div', {
    position: 'relative',
    display: 'grid',
    gridTemplateAreas: '"aside main"',
    gridTemplateColumns: '24.0625rem 1fr',
    gridTemplateRows: 'fit-content',
    gap: '$6',
  }),

  Aside: {
    Container: styled('aside', {
      gridArea: 'aside',
      position: 'sticky',

      display: 'flex',
      flexDirection: 'column',
      gap: '$5',
      height: 'fit-content',
    }),

    CreateAccessPoint: {
      Container: styled('div', {
        display: 'flex',
        flexDirection: 'column',
        gap: '$5',
        padding: '$5',
        backgroundColor: '$blue1',
        borderRadius: '$lg',
      }),
      Heading: styled('h2', {
        fontSize: '$md',
        color: '$slate12',
      }),
      Text: styled('p', {
        fontSize: '$sm',
        color: '$slate11',
      }),
      Extra: styled('a', {
        display: 'flex',
        alignItems: 'center',
        color: '$slate11',
        fontSize: '$sm',
        gap: '$2',
      }),
    },
  },

  Main: styled('main', {
    gridArea: 'main',
    backgroundColor: 'blue',
    display: 'flex',
    height: '200vh',
  }),
};
