'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize

  const OauthProvider = app.model.define('oauth_provider', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: INTEGER.UNSIGNED },
    provider: { type: STRING },
    provider_user_id: { type: STRING },
    email: { type: STRING },
    access_token: { type: STRING },
    refresh_token: { type: STRING },
    created_at: { type: DATE },
    updated_at: { type: DATE }
  }, { tableName: 'oauth_providers', updatedAt: false })

  OauthProvider.associate = function () {
    app.model.OauthProvider.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' })
  }

  return OauthProvider
}
