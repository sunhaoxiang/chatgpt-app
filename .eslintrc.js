module.exports = {
  plugins: ['prettier', 'unused-imports'],
  extends: ['next/core-web-vitals', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    /* ********************************** ES6+ ********************************** */
    'no-console': 0,
    'no-var-requires': 0,
    'no-restricted-syntax': 0,
    'no-continue': 0,
    'no-await-in-loop': 0,
    'no-return-await': 0,
    'no-unused-vars': 0,
    'no-multi-assign': 0,
    'no-param-reassign': [2, { props: false }],
    'max-classes-per-file': 0,
    'class-methods-use-this': 0,
    'guard-for-in': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-lonely-if': 0,
    'no-bitwise': ['error', { allow: ['~'] }],
    'no-restricted-exports': 0,

    // Find and remove unused es6 module imports
    // https://github.com/sweepline/eslint-plugin-unused-imports
    'unused-imports/no-unused-imports': 0,
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true
      }
    ]
  }
}
