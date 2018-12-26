'use strict'

const { factory } = require('factory-girl')

module.exports = app => {
  app.factory = factory

  factory.define('user', app.model.User, {
    email: factory.sequence('User.email', (n) => `user${n}@example.com`),
    name: factory.sequence('User.name', n => `user_${n}`)
  })
  factory.define('password_reset', app.model.PasswordReset, {})
  factory.define('oauth_provider', app.model.OauthProvider, {})
}
