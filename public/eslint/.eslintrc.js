module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    "no-multiple-empty-lines": [1, { "max": 1 }],
    'no-console': 0,
    "no-trailing-spaces": 1,
    eqeqeq: 2,
    "no-empty": 2,
    "no-extra-semi": 2,
    "no-extra-parens": 2,
    "no-irregular-whitespace": 2,
    "no-lone-blocks": 2,
    "no-lonely-if": 2,
  },
  globals: {
    getApp: false,
    Page: false,
    wx: false,
    App: false,
    getCurrentPages: false,
    Component: false
  }
};