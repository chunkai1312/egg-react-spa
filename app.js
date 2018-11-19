'use strict'

// const path = require('path')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./app/passport')(app)
}
