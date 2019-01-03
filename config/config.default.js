'use strict'

require('dotenv').config()

module.exports = appInfo => {
  const config = {

    /**
     * The name of the application.
     *
     * @member {String} Config#name
     */
    name: process.env.APP_NAME,

    /**
     * The key that signing cookies. It can contain multiple keys seperated by `,`.
     *
     * @member {String} Config#keys
     */
    keys: process.env.APP_KEY,

    /**
     * The base URL of the application.
     *
     * @member {String} Config#url
     */
    url: process.env.APP_URL
  }

  /**
   * The middlewares of the application.
   *
   * @member {Array} Config#middleware
   * @see https://eggjs.org/en/basics/middleware.html
   */
  config.middleware = ['errorHandler']

  /**
   * The configuration of `egg-sequelize` plugin.
   *
   * @member {Object} Config#sequelize
   * @see https://github.com/eggjs/egg-sequelize
   */
  config.sequelize = {
    dialect: process.env.DB_CONNECTION || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres'
  }

  /**
   * The configuration of `egg-view` plugin.
   *
   * @member {Object} Config#view
   * @see https://github.com/eggjs/egg-view
   */
  config.view = {
    mapping: {
      '.html': 'nunjucks'
    }
  }

  /**
   * The configuration of `egg-security` plugin.
   *
   * @member {Object} Config#security
   * @see https://github.com/eggjs/egg-security
   */
  config.security = {
    csrf: false
  }

  /**
   * The configuration of `egg-jwt` plugin.
   *
   * @member {Object} Config#jwt
   * @see https://github.com/okoala/egg-jwt
   */
  config.jwt = {
    secret: config.keys
  }

  /**
   * The configuration of `egg-passport-jwt` plugin.
   *
   * @member {Object} Config#passportJwt
   * @see https://github.com/chunkai1312/egg-passport-jwt
   */
  config.passportJwt = {
    secret: config.jwt.secret
  }

  /**
   * The configuration of `egg-passport-google` plugin.
   *
   * @member {Object} Config#passportGoogle
   * @see https://github.com/eggjs-community/egg-passport-google
   */
  config.passportGoogle = {
    key: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config.url}/api/oauth/google/callback`
  }

  /**
   * The configuration of `egg-passport-facebook` plugin.
   *
   * @member {Object} Config#passportFacebook
   * @see https://github.com/renruyi/egg-passport-facebook
   */
  config.passportFacebook = {
    key: process.env.FACEBOOK_CLIENT_ID,
    secret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${config.url}/api/oauth/facebook/callback`
  }

  /**
   * The configuration used for mailer service via `nodemailer`.
   *
   * @member {Object} Config#mailer
   * @see https://github.com/nodemailer/nodemailer
   */
  config.mailer = {
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    },
    defaults: {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`
    }
  }

  return config
}
