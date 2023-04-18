import { styled } from '@/theme';

export const IndexedNFAStyles = {
  Grid: styled('div', {
    position: 'relative',
    display: 'grid',
    gridTemplateAreas: '"aside main"',
  }),
  Aside: styled('div', {
    position: 'sticky',
    top: 0,
    gridArea: 'aside',
    backgroundColor: 'red',
    height: '20rem',
  }),
  Main: styled('main', {
    gridArea: 'main',
    backgroundColor: 'blue',
    height: '200vh',
  }),
};
