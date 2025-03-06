//eslint.config.mjs
//import { FlatCompat } from '@eslint/eslintrc';
import pluginVue from 'eslint-plugin-vue';
import pluginVuetify from 'eslint-plugin-vuetify'

import ts from 'typescript-eslint';
import globals from 'globals';

//const compat = new FlatCompat({
//  config: pluginVuetify.configs.recommended,
//});

export default [
  {
    ignores: [
      '**/node_modules/',
      '.git/',
      'target/', '**/target/', '**/target/**',
    ],
  },
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...ts.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...pluginVue.configs['flat/recommended'],
  ...pluginVue.configs["flat/strongly-recommended"],
 // ...compat.extends("plugin:vue/base", "plugin:vuetify/base"),
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.

  {
    files: [ 'src/vuejs/**/*.vue',
      'src/vuejs/**/*.js', 'src/vuejs/**/*.jsx',
      'src/vuejs/**/*.cjs', 'src/vuejs/**/*.mjs',
      'src/vuejs/**/*.ts', 'src/vuejs/**/*.tsx',
      'src/vuejs/**/*.cts', 'src/vuejs/**/*.mts'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      globals: {
        ...globals.browser,
      }
    },
    plugins: {
      'typescript-eslint': ts.plugin,
      vue: pluginVue,
      vuetify: pluginVuetify
    },
    rules: { 
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      'vue/multi-word-component-names': 'off',
      'vue/valid-v-slot': ['error', {
        allowModifiers: true,
      }],
    },
  },
];

