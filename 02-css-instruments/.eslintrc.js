module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es6': true
  },
  'parserOptions': {
    'ecmaVersion': 8,
    'sourceType': 'module'
  },
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'no-console': ['warn'],
    'no-undef': ['warn'],
  },
  'extends': [
    'eslint:recommended',
  ]
};
