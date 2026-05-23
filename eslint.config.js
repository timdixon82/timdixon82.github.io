// ESLint flat config (ESLint 9+).
// The project's own JavaScript runs in the browser as a classic script
// (inline in index.html; no separate module files until the file split
// in ADR 001 is complete). The self-hosted GoatCounter count.js is
// third-party code and is excluded from linting.
//
// Browser globals come from the `globals` package so the no-undef rule
// catches real undefined references without a hand-kept list.

import globals from 'globals';

export default [
  {
    ignores: ['assets/analytics/count.js', 'node_modules/**'],
  },
  {
    files: ['*.js'],
    ignores: ['eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': ['error', { caughtErrorsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'eqeqeq': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
    },
  },
];
