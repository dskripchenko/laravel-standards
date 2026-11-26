// Starting point for a new frontend. A repository that already has an
// ESLint config keeps it (CORE-05). Copying this file means adding the
// matching devDependencies through the project's package manager.

import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
]
