'use strict'

module.exports = appInfo => {
  const config = {}

  /**
   * The configuration of `egg-view-assets` plugin.
   *
   * @member {Object} Config#assets
   * @see https://github.com/eggjs/egg-view-assets
   */
  config.assets = {
    publicPath: '/public/dist/'
  }

  return config
}
