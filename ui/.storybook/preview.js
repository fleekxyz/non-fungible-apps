import { dripStitches } from '../src/theme/stitches';
import addons from '@storybook/addons';
import { useEffect } from 'react';

const channel = addons.getChannel();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    disable: true,
  },

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const { darkTheme: darkThemeClassName } = dripStitches;

export const decorators = [
  (renderStory) => {
    const { globalCss } = dripStitches;

    const globalStyles = globalCss({
      '*, html': {
        'font-family': 'Manrope',
      },
    });

    globalStyles();

    useEffect(() => {
      function switchColorMode(isDarkMode) {
        document.body.classList.remove('light', darkThemeClassName);
        document.body.classList.add(isDarkMode ? darkThemeClassName : 'light');
      }

      channel.on('DARK_MODE', switchColorMode);
      return () => channel.off('DARK_MODE', switchColorMode);
    }, []);

    return renderStory();
  },
];
