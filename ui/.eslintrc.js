module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    '../.eslintrc.js',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/no-namespace': 'off',
    'simple-import-sort/imports': 2,
    'no-console': 'error',
    'react/react-in-jsx-scope': 'off',
  },
};
