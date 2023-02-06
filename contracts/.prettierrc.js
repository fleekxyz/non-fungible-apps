const base = require('../.prettierrc.js');

module.exports = {
  overrides: [
    {
      files: '*.sol',
      options: {
        printWidth: 120,
        tabWidth: 4,
        singleQuote: false,
        bracketSpacing: false,
      },
    },
  ],
  ...base,
};
