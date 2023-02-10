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
      },
      width: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [],
};
