const expo = require('eslint-config-expo/flat');
const eslintConfigPrettier = require('eslint-config-prettier/flat');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**', '.expo/**', 'dist/**'],
  },
  ...expo,
  {
    files: ['**/__tests__/**/*.js', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  eslintConfigPrettier,
];
