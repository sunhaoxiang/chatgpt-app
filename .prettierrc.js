module.exports = {
  arrowParens: 'avoid',
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports']
}
