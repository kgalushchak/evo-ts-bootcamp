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
    'react-hooks/rules-of-hooks': ['error'],
    'react-hooks/exhaustive-deps': ['warn']
  },
  'parser': '@typescript-eslint/parser',
  'plugins': [
    '@typescript-eslint',
    'react-hooks'
  ],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ]
};
