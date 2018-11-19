'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize

    await queryInterface.createTable('password_resets', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: STRING, allowNull: false },
      token: { type: STRING, allowNull: false },
      created_at: { type: DATE }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('password_resets')
  }
}
