import { globalCss } from '@stitches/react';

export const themeGlobals = globalCss({
  'html, body': {
    height: '100%',

    //TODO add theme colors
    color: '#ECEDEE',
    backgroundColor: 'black',

    fontFamily: 'Manrope',
    fontSize: '16px',

    '@media (max-width: 850px)': {
      fontSize: '13px',
    },
  },

  '*': {
    margin: '0',
    padding: '0',
    border: '0',
    boxSizing: 'border-box',
  },
});
