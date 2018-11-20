'use strict'

const { factory } = require('factory-girl')

module.exports = app => {
  app.factory = factory
  // define your own test data structures
  // factory.define('user', app.model.User, {
  //   name: factory.sequence('User.name', n => `name_${n}`),
  //   age: 18
  // })

  factory.define('user', app.model.User, {
    email: factory.sequence('User.email', (n) => `user${n}@example.com`),
    name: factory.sequence('User.name', n => `user_${n}`)
  })

  factory.define('password_reset', app.model.PasswordReset, {})
}
