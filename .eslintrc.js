module.exports = {
  plugins: ['prettier', 'import', 'unused-imports'],
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

    /* ********************************** Module Import ********************************** */

    'import/no-absolute-path': 0,
    'import/extensions': 0,
    'import/no-named-default': 0,
    'no-restricted-exports': 0,

    // Forbid the use of extraneous packages
    'import/no-extraneous-dependencies': [
      1,
      {
        devDependencies: [
          '**/*.test.{ts,js}',
          '**/*.spec.{ts,js}',
          './test/**.{ts,js}',
          './scripts/**/*.{ts,js}'
        ]
      }
    ],
    // Enforce a convention in module import order
    'import/order': [
      1,
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after'
          }
        ],
        alphabetize: { order: 'asc', caseInsensitive: false },
        'newlines-between': 'always-and-inside-groups',
        warnOnUnassignedImports: true
      }
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true
      }
    ],
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
