import { Skeleton } from '@/components';
import { styled } from '@/theme';

const Spacing = '$5';

export const IndexedNFAStyles = {
  Grid: styled('div', {
    display: 'grid',
    gridTemplateAreas: '"aside main"',
    gridTemplateColumns: '24.0625rem 1fr',
    gridTemplateRows: 'fit-content',
    gap: Spacing,
    padding: Spacing,

    '@media (max-width: 1080px)': {
      gridTemplateColumns: '20rem 1fr',
    },

    '@media (max-width: 580px)': {
      gridTemplateAreas: '"aside" "main"',
      gridTemplateColumns: '1fr',
    },
  }),

  Aside: {
    Container: styled('aside', {
      gridArea: 'aside',
      position: 'sticky',

      display: 'flex',
      flexDirection: 'column',
      gap: Spacing,
      height: 'fit-content',

      '@media (max-width: 580px)': {
        position: 'static',
      },
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
        left: '84%',
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

    Table: {
      Container: styled('div', {
        border: '1px solid $slate6',
        borderRadius: '10px',
        padding: '0 $5',

        maxHeight: '15.125rem',
        overflow: 'auto',
      }),
      Root: styled('table', {
        width: 'calc(100% + 2 * $space$5)',
        margin: '0 -$5',
      }),
      Head: styled('thead', {
        position: 'sticky',
        top: 0,
        backgroundColor: '$black',

        '&:after': {
          position: 'absolute',
          content: '""',
          bottom: 0,
          left: 0,
          right: 0,
          borderBottom: '1px solid $slate6',
        },
      }),
      Row: styled('tr'),
      Data: styled('td', {
        padding: '$3',
        maxWidth: '10rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
      Body: styled('tbody', {
        tr: {
          '&:hover': {
            backgroundColor: '$slate6',
            cursor: 'pointer',
          },
        },
      }),
      Marker: styled('span', {
        display: 'block',
        margin: 'auto',
        width: '0.5625rem',
        height: '0.5625rem',
        borderRadius: '$full',
        backgroundColor: '$slate6',

        variants: {
          variant: {
            active: {
              backgroundColor: '$green11',
            },
            inactive: {
              backgroundColor: '$slate8',
            },
          },
          text: {
            true: {
              fontSize: '$xs',
              padding: '0 $2',
              width: 'fit-content',
              height: 'fit-content',
            },
          },
        },

        compoundVariants: [
          {
            variant: 'active',
            text: true,
            css: {
              color: '$green11',
              backgroundColor: '$green3',
            },
          },
        ],
      }),
    },
  },

  Skeleton: styled(Skeleton, {
    borderRadius: '$lg',
  }),
};
