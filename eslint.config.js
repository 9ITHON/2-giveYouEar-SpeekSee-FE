import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // 브라우저 환경
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // React Refresh 관련
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Import 정렬 및 관리
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': 'error',

      // Console 관련
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],

      // 변수 및 코드 품질
      'no-unused-vars': 'error',
      'no-undef': 'error',

      // 포맷팅 관련
      'no-multiple-empty-lines': 'error',
      indent: ['error', 2],
      'no-trailing-spaces': 'error',
    },
  },
]);
