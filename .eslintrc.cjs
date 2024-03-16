/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 'latest'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
  },
}
