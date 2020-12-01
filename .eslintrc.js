module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'object-curly-newline': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'no-underscore-dangle': 0,
    'react/no-array-index-key': 0,
    'no-unused-vars': 0,
  },
};
