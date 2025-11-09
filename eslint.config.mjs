import js from '@eslint/js';
import globals from 'globals';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node, // or globals.browser if you’re doing browser work
    },
    extends: [
      js.configs.recommended, // ESLint’s base JS rules
      pluginPrettierRecommended, // Integrate Prettier (auto-formats + disables conflicting rules)
    ],
    rules: {
      // Optional: customize or relax rules here
      'no-console': 'off',
    },
  },
]);
