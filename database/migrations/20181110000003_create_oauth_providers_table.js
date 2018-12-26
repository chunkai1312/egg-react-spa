'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize

    await queryInterface.createTable('oauth_providers', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: INTEGER.UNSIGNED, references: { model: 'users', key: 'id' }, onDelete: 'cascade' },
      provider: { type: STRING },
      provider_user_id: { type: STRING },
      email: { type: STRING },
      access_token: { type: STRING },
      refresh_token: { type: STRING },
      created_at: { type: DATE },
      updated_at: { type: DATE }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_providers')
  }
}
