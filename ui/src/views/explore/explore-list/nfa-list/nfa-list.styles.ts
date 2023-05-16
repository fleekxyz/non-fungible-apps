import { Skeleton } from '@/components';
import { styled } from '@/theme';

export const NFAListFragmentStyles = {
  Container: styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(12.5rem, 1fr))',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '$6',
    my: '$6',
    minHeight: '50vh',
    marginBottom: '30vh', // TODO: remove this if we add page footer

    '@media (min-width: 1080px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
    },
  }),
  EmptyMessage: styled('span', {
    padding: '$2 $3 $4 $3',
    textAlign: 'center',
    color: '$slate11',
    width: '100%',
  }),
  Table: {
    Container: styled('div', {
      marginTop: '$6',
      padding: '0 $5',

      // maxHeight: '15.125rem',
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
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    Body: styled('tbody', {
      tr: {
        height: '3rem',
        '&:hover': {
          // backgroundColor: '$slate6',
          cursor: 'pointer',
        },
      },
    }),
  },

  Skeleton: styled(Skeleton, {
    borderRadius: '$lg',
  }),
};
