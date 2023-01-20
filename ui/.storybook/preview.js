import { dripStitches } from '../src/theme/stitches';
import addons from '@storybook/addons';
import { useEffect } from 'react';
import { themes } from '@storybook/theming';

const channel = addons.getChannel();

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
      body: {
        backgroundColor: 'black',
      },
    });

    globalStyles();

    useEffect(() => {
      function switchColorMode(isDarkMode) {
        document.body.style.backgroundColor = isDarkMode ? 'black' : 'white';
        document.body.classList.remove('light', darkThemeClassName);
        document.body.classList.add(isDarkMode ? darkThemeClassName : 'light');
      }

      channel.on('DARK_MODE', switchColorMode);
      return () => channel.off('DARK_MODE', switchColorMode);
    }, []);

    return renderStory();
  },
];
