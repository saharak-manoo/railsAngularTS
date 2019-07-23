const { environment } = require('@rails/webpacker')
const typescript = require('./loaders/typescript')

environment.loaders.prepend('typescript', typescript)
environment.loaders.append('html', {
  test: /\.html$/,
  use: 'html-loader'
})

module.exports = environment
