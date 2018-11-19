'use strict'

const Service = require('egg').Service

class AuthService extends Service {
  async attempt (credentials) {
    const user = await this.ctx.model.User.findOne({
      where: { email: credentials.email }
    })
    if (!user) return false
    return user.authenticate(credentials.password) ? user : false
  }
}

module.exports = AuthService
