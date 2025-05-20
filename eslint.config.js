import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default tseslint.config({
  ignores: ['dist', './src/components/ui/**'],
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginUnicorn.configs.recommended,
    eslintConfigPrettier,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  ],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  linterOptions: {
    noInlineConfig: true,
    reportUnusedDisableDirectives: 'error',
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: {
          optionalityOrder: 'required-first',
        },
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': ['error', { ignore: [0, 1] }],
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/consistent-type-assertions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: ['vite-env.d.ts'],
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          acc: true,
          env: true,
          i: true,
          j: true,
          props: true,
          Props: true,
        },
      },
    ],
  },
});
