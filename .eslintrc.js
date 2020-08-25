module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/max-attributes-per-line': 0,
    'no-shadow': ['error', { allow: ['state'] }],
    'max-len': 0,
    'no-plusplus': 0,
    'import/no-extraneous-dependencies': 0,
    'object-shorthand': 0,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ]
};
