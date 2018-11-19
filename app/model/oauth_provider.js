'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize

  const OauthProvider = app.model.define('oauth_provider', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: INTEGER.UNSIGNED, allowNull: false },
    provider: { type: STRING, allowNull: false },
    provider_user_id: { type: STRING, allowNull: false },
    access_token: { type: STRING },
    refresh_token: { type: STRING },
    created_at: { type: DATE },
    updated_at: { type: DATE }
  }, { tableName: 'oauth_providers', updatedAt: false })

  return OauthProvider
}
