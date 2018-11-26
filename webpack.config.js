'use strict'

module.exports = (webpackConfig, env) => {
  webpackConfig.module.rules.push({
    test: /locales/,
    loader: 'i18next-resource-store-loader'
  })
  return webpackConfig
}
