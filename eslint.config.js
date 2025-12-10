import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';

import js from '@eslint/js';

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{ts,tsx,js,jsx}'],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier: eslintPluginPrettier,
    },

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      'plugin:prettier/recommended',
    ],

    rules: {
      quotes: ['warn', 'single'],

      // JSX / React formatting
      'react/jsx-indent': ['warn', 2],
      'react/jsx-indent-props': ['warn', 2],
      'react/jsx-closing-bracket-location': [
        'warn',
        {
          selfClosing: 'tag-aligned',
          nonEmpty: 'after-props',
        },
      ],
      'react/jsx-curly-spacing': ['warn', { when: 'never', children: true }],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react$'],
            ['^\\w'],
            ['^@global/store'],
            ['^@global/router'],
            ['^@components/'],
            ['^@shared/(interfaces|types|enums)'],
            ['^@shared/config'],
            ['^@shared/hooks'],
            ['^@shared/components'],
            ['^@shared/assets'],
            ['^.+\\.css$'],
          ],
        },
      ],
    },
  },
]);
