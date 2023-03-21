/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        //TODO if we're gonna have ligth mode we should add also the light colors cause tailwind doesn't have them
        slate5: 'rgba(43, 47, 49, 1)',
        slate6: 'rgba(49, 53, 56, 1)',
        slate7: 'rgba(58, 63, 66, 1)',
        slate11: 'rgba(155, 161, 166, 1)',
        slate12: 'rgba(236, 237, 238, 1)',
        green4: 'rgba(17, 49, 35, 1)',
        green11: 'rgba(76, 195, 138, 1)',
        red4: 'rgba(72, 26, 29, 1)',
        red11: 'rgba(255, 99, 105, 1)',
      },
      borderRadius: {
        xhl: '1.25rem',
      },
      maxWidth: {
        70: '70%',
      },
      space: {
        '1h': '0.375rem',
      },
      zIndex: {
        '0h': '0.065rem',
      },
    },
  },
  plugins: [],
};
