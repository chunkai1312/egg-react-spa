'use strict'

const crypto = require('crypto')
const bcrypt = require('bcrypt')

module.exports = app => {
  const { INTEGER, STRING, DATE, VIRTUAL } = app.Sequelize

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: STRING, allowNull: false, unique: true },
    password: { type: STRING },
    name: { type: STRING },
    photo_url: {
      type: VIRTUAL,
      get: function () {
        const hash = crypto.createHash('md5').update(this.get('email')).digest('hex')
        return `https://gravatar.com/avatar/${hash}`
      }
    },
    created_at: { type: DATE },
    updated_at: { type: DATE }
  }, { tableName: 'users' })

  User.associate = function () {
    app.model.User.hasMany(app.model.OauthProvider, { as: 'providers' })
  }

  User.prototype.authenticate = function (password, hashedPassword) {
    return bcrypt.compareSync(password, this.get('password'))
  }

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.password
    return values
  }

  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      const salt = bcrypt.genSaltSync(10)
      user.password = bcrypt.hashSync(user.password, salt)
    }
  })

  return User
}
