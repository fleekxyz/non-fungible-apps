module.exports = {
  extends: ['../.eslintrc.js'],
  rules: {
    'no-undef': 'off',
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
