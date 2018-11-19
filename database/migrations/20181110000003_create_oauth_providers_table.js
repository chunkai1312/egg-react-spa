'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize

    await queryInterface.createTable('oauth_providers', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'cascade' },
      provider: { type: STRING, allowNull: false },
      provider_user_id: { type: STRING, allowNull: false },
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
