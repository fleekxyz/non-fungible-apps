import { styled } from '@/theme';

const Spacing = '$5';

export const IndexedNFAStyles = {
  Grid: styled('div', {
    position: 'relative',
    display: 'grid',
    gridTemplateAreas: '"aside main"',
    gridTemplateColumns: '24.0625rem 1fr',
    gridTemplateRows: 'fit-content',
    gap: `calc(3 * ${Spacing})`,
  }),

  Aside: {
    Container: styled('aside', {
      gridArea: 'aside',
      position: 'sticky',

      display: 'flex',
      flexDirection: 'column',
      gap: Spacing,
      height: 'fit-content',
    }),

    CreateAccessPoint: {
      Container: styled('div', {
        display: 'flex',
        flexDirection: 'column',
        gap: Spacing,
        padding: Spacing,
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

  Main: {
    Container: styled('main', {
      gridArea: 'main',
      display: 'flex',
      flexDirection: 'column',
      height: '200vh',
      gap: Spacing,
    }),
    Heading: styled('h1', {
      fontSize: '2.125rem',
      lineHeight: 1.35,
      fontWeight: 700,
    }),
    SectionHeading: styled('h2', {
      fontSize: '$xl',
      lineHeight: 1.2,
      fontWeight: 700,
    }),
    Divider: {
      Line: styled('span', {
        width: '100%',
        borderBottom: '1px solid $slate6',
      }),
      Elipse: styled('span', {
        width: '0.375rem',
        height: '0.375rem',
        backgroundColor: '$slate4',
        borderRadius: '100%',
      }),
    },
    Paragraph: styled('p', {
      color: '$slate11',
      lineHeight: 1.43,
    }),
    DataContainer: styled('div', {
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid $slate6',
      borderRadius: '$lg',
      padding: Spacing,
      gap: `$1`,
    }),
    DataList: styled('div', {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '$5',
    }),
    VerificationBanner: styled('div', {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      border: '1px solid $slate6',
      borderRadius: '$lg',
      padding: '$8 $5',
      fontWeight: 700,
      overflow: 'hidden',

      '&:after': {
        content: '""',
        position: 'absolute',
        right: '-$5',
        top: '-$10',
        bottom: '-$10',
        left: '80%',
        borderRadius: '80% 0 0 80%',
      },

      variants: {
        verified: {
          true: {
            borderColor: '$green11',
            color: '$green11',
            '&:after': {
              backgroundColor: '$green11',
            },
          },
          false: {
            borderColor: '$red11',
            color: '$red11',
            '&:after': {
              backgroundColor: '$red11',
            },
          },
        },
      },
    }),
  },
};
