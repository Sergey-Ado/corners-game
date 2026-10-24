import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import turboPlugin from 'eslint-plugin-turbo';

const eslintBaseConfig = [
  eslintPluginUnicorn.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{js,ts,tsx}'],
    plugins: { js, prettier: eslintPluginPrettier, turbo: turboPlugin },
    extends: ['js/recommended'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      eqeqeq: 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'unicorn/no-top-level-side-effects': 'off',
      'turbo/no-undeclared-env-vars': 'warn',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/name-replacements': [
        'error',
        {
          replacements: {
            props: { properties: false },
          },
        },
      ],
    },
  },
  {
    files: ['**/*.config.{js,ts}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
  eslintConfigPrettier,
];

export default eslintBaseConfig;
