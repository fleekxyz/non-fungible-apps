import { extendTheme } from '@chakra-ui/react';

const appTheme = {
  styles: {
    global: {
      body: {
        color: 'rgba(255, 255, 255, 0.87)',
        bg: '#242424',
        margin: '50px',
      },
    },
  },
  fonts: {
    heading: 'Inter, Avenir, Helvetica, Arial, sans-serif',
    body: 'Inter, Avenir, Helvetica, Arial, sans-serif',
  },
  sizes: {
    modalHeight: '345px',
  },
};

export const theme = extendTheme(appTheme);

