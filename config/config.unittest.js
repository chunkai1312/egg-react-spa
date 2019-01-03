'use strict'

module.exports = appInfo => {
  const config = {

    /**
     * The debug mode of the application.
     *
     * @member {String} Config#debug
     */
    debug: true,

    /**
     * The name of the application.
     *
     * @member {String} Config#name
     */
    name: appInfo.name,

    /**
     * The key that signing cookies. It can contain multiple keys seperated by `,`.
     *
     * @member {String} Config#keys
     */
    keys: appInfo.name + '_1541787300110_3713',

    /**
     * The base URL of the application.
     *
     * @member {String} Config#url
     */
    url: 'http://localhost:7001'
  }

  /**
   * The configuration of `egg-logger` plugin.
   *
   * @member {Object} Config#logger
   * @see https://github.com/eggjs/egg-logger
   */
  config.logger = {
    level: 'NONE',
    consoleLevel: 'NONE'
  }

  /**
   * The configuration of `egg-sequelize` plugin.
   *
   * @member {Object} Config#sequelize
   * @see https://github.com/eggjs/egg-sequelize
   */
  config.sequelize = {
    dialect: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
    username: 'postgres',
    password: 'postgres'
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
    key: 'google-client-id',
    secret: 'google-client-secret',
    callbackURL: `${config.url}/api/oauth/google/callback`
  }

  /**
   * The configuration of `egg-passport-facebook` plugin.
   *
   * @member {Object} Config#passportFacebook
   * @see https://github.com/renruyi/egg-passport-facebook
   */
  config.passportFacebook = {
    key: 'facebook-client-id',
    secret: 'facebook-client-secret',
    callbackURL: `${config.url}/api/oauth/facebook/callback`
  }

  return config
}
