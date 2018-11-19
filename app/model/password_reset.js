'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize

  const PasswordReset = app.model.define('password_reset', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: STRING, allowNull: false },
    token: { type: STRING, allowNull: false },
    created_at: { type: DATE }
  }, { tableName: 'password_resets', updatedAt: false })

  return PasswordReset
}
