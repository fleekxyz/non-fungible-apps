import { globalCss } from '@stitches/react';

export const themeGlobals = globalCss({
  'html, body': {
    height: '100%',
    padding: 0,
    margin: '25px 50px',
    color: '#ECEDEE',
    backgroundColor: 'black',

    fontFamily: 'Manrope',

    fontSize: '16px',
    '@media (max-width: 850px)': {
      fontSize: '13px',
    },
  },
});
