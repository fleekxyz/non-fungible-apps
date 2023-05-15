import { globalCss } from '@stitches/react';

export const themeGlobals = globalCss({
  'html, body, #root': {
    height: '100%',
    padding: 0,
    color: '#ECEDEE',
    backgroundColor: 'black',

    fontFamily: 'Manrope',

    fontSize: '16px',

    '@media (max-width: 850px)': {
      fontSize: '13px',
    },
  },
});
