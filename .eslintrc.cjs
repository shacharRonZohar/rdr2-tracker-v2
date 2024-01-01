module.exports = {
  // ...
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/multi-word-component-names': 'off',
    'import/no-named-as-default': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  // ...
}
