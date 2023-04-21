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
};
