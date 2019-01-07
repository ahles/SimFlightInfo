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
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': 0,
    'no-shadow': ['error', { allow: ['state'] }],
    'max-len': 0,
    'no-plusplus': 0,
    // 'import/no-unresolved': 0,
    // 'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
