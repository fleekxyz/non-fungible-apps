import { Button, Flex, Skeleton, Text } from '@/components';
import { styled } from '@/theme';

const Spacing = '$6';

export const IndexedNFAStyles = {
  Grid: styled('div', {
    display: 'grid',
    gridTemplateAreas: '"aside main"',
    gridTemplateColumns: '24.0625rem 1fr',
    gridTemplateRows: 'fit-content',
    gap: `calc(2 * ${Spacing})`,
    padding: Spacing,

    '@media (max-width: 1080px)': {
      gridTemplateColumns: '20rem 1fr',
    },

    '@media (max-width: 640px)': {
      gridTemplateAreas: '"aside" "main"',
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
      padding: '0',
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

      borderRadius: '$lg',
      padding: Spacing,
      maxWidth: '24rem',
      mixBlendMode: 'screen',

      '@media (max-width: 640px)': {
        position: 'static',
      },
    }),
    Header: {
      Wrapper: styled(Flex, {
        flexDirection: 'column',
        gap: '$2h',
        color: '$slate12',
      }),
      Container: styled(Flex, {
        justifyContent: 'space-between',
        alignItems: 'center',
      }),
      Header: styled('h1', {
        fontSize: '2.125rem',
        lineHeight: 1.35,
        fontWeight: 700,

        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
      Badge: styled('span', {
        height: 'fit-content',
        width: 'fit-content',
        fontSize: '$xs',
        fontWeight: '$bold',
        padding: '$0h $2',
        borderRadius: '$full',
        backgroundColor: '#131313',
        display: 'flex',
        gap: '$1h',

        variants: {
          verified: {
            true: {
              color: '$green10',
            },
            false: {
              color: '$red10',
            },
          },
        },
      }),
    },
    Divider: {
      Line: styled('span', {
        width: '100%',
        borderBottom: '1px solid $slate6',
      }),
      Elipse: styled('span', {
        width: '0.375rem',
        height: '0.375rem',
        backgroundColor: '$slate8',
        borderRadius: '100%',
      }),
    },
    Button: {
      Container: styled(Flex, {
        gap: '$3',
        fontSize: '16px',

        [`${Button}`]: {
          borderRadius: '0.375rem',
        },
      }),
    },
    Overview: {
      Container: styled('div', {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: '$lg',
        fontSize: '14px',
      }),
      Row: {
        Container: styled(Flex, {
          justifyContent: 'space-between',
        }),
        Label: styled(Text, {
          color: '$slate11',
        }),
        Value: styled(Text, {
          fontWeight: '$bold',
        }),
      },
      Description: styled('p', {
        color: '$slate11',
      }),
    },
    Properties: {
      Container: styled('div', {
        display: 'flex',
        flexDirection: 'column',
        gap: '$1',
        padding: '$2h $4',
      }),
    },
  },

  Main: {
    Container: styled('main', {
      gridArea: 'main',
      display: 'flex',
      flexDirection: 'column',
      gap: Spacing,
      width: '100%',
    }),
    Heading: styled('h2', {
      fontSize: '1.625rem',
      lineHeight: 1.35,
      fontWeight: 700,
    }),
    AccessPoint: {
      List: styled('div', {
        display: 'flex',
        flexDirection: 'column',
        gap: Spacing,
      }),
      Grid: styled('div', {
        display: 'grid',
        gridTemplateAreas: '"thumbnail data"',
        gap: '$4h',
        alignItems: 'center',
        gridTemplateColumns: '7rem 1fr',
      }),
      Thumbnail: styled('div', {
        gridArea: 'thumbnail',
      }),
      Data: {
        Container: styled('div', {
          gridArea: 'data',

          display: 'flex',
          flexDirection: 'column',
          gap: '$2',
        }),
      },
      Title: styled('h3', {
        color: '$slate12',
        fontSize: '$lg',
      }),
      NoResults: styled('div', {
        display: 'flex',
        justifyContent: 'center',

        fontSize: '$lg',
      }),
    },
    Divider: {
      Line: styled('span', {
        width: '100%',
        borderBottom: '1px solid $slate6',
      }),
      Elipse: styled('span', {
        minWidth: '0.375rem',
        minHeight: '0.375rem',
        backgroundColor: '$slate11',
        borderRadius: '100%',
      }),
    },
  },

  Skeleton: styled(Skeleton, {
    borderRadius: '$lg',
  }),
};
