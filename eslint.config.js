// eslint.config.js
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import airbnbBase from 'eslint-config-airbnb-base';

export default [
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020, // Corresponds to ecmaVersion 11
      sourceType: 'module',
      globals: {
        ...js.globals.browser,
        ...js.globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // Or your tsconfig path
      },
    },
    rules: {
      ...airbnbBase.rules,
      ...tsPlugin.configs.recommended.rules, // Add recommended TS rules
      'no-undef': 'off', // Rule is handled by TypeScript
      'spaced-comment': 'off',
      'max-len': 'off',
      'import/extensions': ['error', 'always', { js: 'never', ts: 'never' }],
      'max-classes-per-file': 'off',
      'prefer-destructuring': 'off',
      'no-plusplus': 'off',
      'no-use-before-define': 'off',
      'no-param-reassign': 'off',
      'vars-on-top': 'off',
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.ts'] },
      },
    },
    {
    ignores: [
      '**/lib/**',
      '**/dist/**'
    ]
    }
  },
];
