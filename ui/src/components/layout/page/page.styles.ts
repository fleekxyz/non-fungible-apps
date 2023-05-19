import { styled } from '@/theme';

export const PageStyles = {
  GradientOverlay: styled('div', {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  }),

  Content: styled('main', {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '85vh',
    maxWidth: '$6xl',
    padding: '$6',
    margin: '0 auto',

    '@md': {
      padding: '0 $6',
    },
  }),
};
