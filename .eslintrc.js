module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './contracts/tsconfig.json',
      './ui/tsconfig.json',
      './subgraph/tsconfig.json',
      './subgraph/tsconfig.tools.json',
      './serverless/tsconfig.json',
    ],
  },
  plugins: ['@typescript-eslint', 'prettier', 'filenames-simple'],
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'filenames-simple/naming-convention': [
          'error',
          {
            rule: 'kebab-case',
          },
        ],
      },
    },
  ],
};
