import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default [
  globalIgnores(['dist']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
];
