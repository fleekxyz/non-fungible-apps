import { extendTheme } from '@chakra-ui/react';
import { colors } from './foundations';

const appTheme = {
  styles: {
    global: {
      body: {
        html: {
          fontSize: '16px',
        },
        color: 'rgba(255, 255, 255)',
        bg: 'custom.black',
        margin: '25px 50px',
      },
    },
  },
  fonts: {
    heading: 'Nunito Sans,Helvetica,Arial,Lucida,sans-serif',
    body: 'Nunito Sans,Helvetica,Arial,Lucida,sans-serif',
  },
  sizes: {
    modalHeight: '345px',
  },
  colors,
};

export const theme = extendTheme(appTheme);
