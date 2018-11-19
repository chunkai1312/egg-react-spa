'use strict'

module.exports = appInfo => {
  const config = exports = {}

  config.host = 'http://localhost:7001'

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541787300110_3713'

  // add your config here
  config.middleware = ['errorHandler']

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'postgres',
    hostname: '127.0.0.1',
    port: 5432,
    database: 'postgres',
    username: 'postgres',
    password: 'postgres'
  }

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
        APP_ROOT: process.cwd() + '/app/web',
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

  config.jwt = {
    secret: 'your-jwt-secret'
  }

  config.mailer = {
    service: 'Mailgun',
    auth: {
      user: 'your-mailgun-username',
      pass: 'your-mailgun-password'
    }
  }

  config.passportGoogle = {
    key: 'your-google-client-id',
    secret: 'your-google-client-secret',
    callbackURL: `${config.host}/api/oauth/google/callback`
  }

  config.passportFacebook = {
    key: 'your-facebook-client-id',
    secret: 'your-facebook-client-id',
    callbackURL: `${config.host}/api/oauth/facebook/callback`
  }

  return config
}
