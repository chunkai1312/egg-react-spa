'use strict'

const Service = require('egg').Service

class UserService extends Service {
  findByEmail (email) {
    return this.ctx.model.User.findOne({ where: { email } })
  }

  async update (id, updates) {
    const user = await this.ctx.model.User.findById(id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user.update(updates)
  }
}

module.exports = UserService
