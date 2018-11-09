'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541787300110_3713'

  // add your config here
  config.middleware = []

  // change to your own sequelize configurations
  // config.sequelize = {
  //   dialect: 'mysql',
  //   hostname: '127.0.0.1',
  //   port: 3306,
  //   database: 'egg-sequelize-default'
  // }

  config.view = {
    mapping: {
      '.html': 'nunjucks'
    }
  }

  config.assets = {
    publicPath: '/public/dist/',
    devServer: {
      debug: true,
      command: 'roadhog dev',
      port: 8000,
      env: {
        BROWSER: 'none',
        ESLINT: 'none',
        SOCKET_SERVER: 'http://127.0.0.1:8000',
        PUBLIC_PATH: 'http://127.0.0.1:8000'
      }
    }
  }

  config.security = {
    csrf: false
  }

  return config
}
