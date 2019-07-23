const { environment } = require('@rails/webpacker')
const typescript = require('./loaders/typescript')

environment.loaders.prepend('typescript', typescript)
environment.loaders.append('html', {
  test: /\.(ts|tsx)?(\.erb)?$/,
  use: [{
    loader: 'html-loader',
    options: {
      minimize: true,
      removeAttributeQuotes: false,
      caseSensitive: true,
      customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
      customAttrAssign: [/\)?\]?=/]
    }
  }]
})

module.exports = environment
