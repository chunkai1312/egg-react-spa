'use strict'

module.exports = appInfo => {
  const config = {

    /**
     * The debug mode of the application.
     *
     * @member {String} Config#name
     */
    debug: process.env.APP_DEBUG || false,

    /**
     * The name of the application.
     *
     * @member {String} Config#name
     */
    name: process.env.APP_NAME || appInfo.name,

    /**
     * The key that signing cookies. It can contain multiple keys seperated by `,`.
     *
     * @member {String} Config#keys
     */
    keys: process.env.APP_KEY || appInfo.name + '_1541787300110_3713',

    /**
     * The base URL of the application.
     *
     * @member {String} Config#url
     */
    url: process.env.APP_URL || 'http://localhost:7001'
  }

  /**
   * The configuration of `egg-view-assets` plugin.
   *
   * @member {Object} Config#assets
   * @see https://github.com/eggjs/egg-view-assets
   */
  config.assets = {
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

  return config
}
