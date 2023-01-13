import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  theme: darkTheme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      gray50: '#3b3b3b',
      gray100: '#4e4e4e',
      gray200: '#282824',
      black: '#161616',
      blue100: '#1d4ed8',
      transparent50: '#c5c5c50a',
      transparent100: '#f3f3f36b',
    },
    space: {
      xs: '0.32rem',
      sm: '0.625rem',
      md: '1.25rem',
      lg: '2.375rem',
      xl: '4.75rem',
    },
    fontSizes: {
      sm: '0.75rem',
      md: '1rem',
      lg: '1.75rem',
      'h-sm': '1rem',
      'h-md': '1.5rem',
      'h-lg': '2rem',
    },
    radii: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.5rem',
      full: '9999px',
    },
    borderWidths: {
      default: '1px',
      focus: '2px',
    },
    borderStyles: {
      default: 'solid',
    },
  },
  media: {
    sm: '(max-width: 640px)',
    md: '(max-width: 850px)',
    lg: '(max-width: 1140px)',
    large: '(min-width: 1140px)',
  },
});
