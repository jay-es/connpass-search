module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'react-app',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react-hooks',
  ],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    '@typescript-eslint/camelcase': ['error', {
      allow: ['keyword_or', 'results_available', 'results_returned', 'results_start'],
    }],
    'padding-line-between-statements': [
      'error',
      { // ブロックなどの後に空行を入れる
        blankLine: 'always',
        prev: ['block-like', 'multiline-expression'],
        next: '*',
      },
      { // return 文などの前に空行を入れる
        blankLine: 'always',
        prev: '*',
        next: ['return', 'throw', 'break', 'continue'],
      },
    ],
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
    react: {
      version: '16.12',
    },
  },
};
