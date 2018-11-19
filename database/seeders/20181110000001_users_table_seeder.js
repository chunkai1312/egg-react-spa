'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
        name: 'Administrator',
        created_at: '2018-01-01T00:00:00.000Z',
        updated_at: '2018-01-01T00:00:00.000Z'
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
