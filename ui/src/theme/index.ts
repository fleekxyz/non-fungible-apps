import { extendTheme } from '@chakra-ui/react';

const appTheme = {
  styles: {
    global: {
      body: {
        color: 'rgba(255, 255, 255)',
        bg: '#161616',
        margin: '50px',
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
};

export const theme = extendTheme(appTheme);
