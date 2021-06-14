module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es6': true
  },
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'no-console': ['warn'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/ban-types': ['off'],
  },
  'parser': '@typescript-eslint/parser',
  'plugins': [
    '@typescript-eslint',
  ],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ]
};
