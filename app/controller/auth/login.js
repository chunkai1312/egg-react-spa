'use strict'

const Controller = require('egg').Controller

class LoginController extends Controller {
  async login () {
    const ctx = this.ctx

    ctx.validate({
      email: { type: 'email' },
      password: { type: 'password' }
    })

    const credentials = ctx.request.body
    const user = await ctx.service.auth.attempt(credentials)
    if (!user) ctx.throw(401, 'invalid login')
    await ctx.login(user)

    const token = this.app.jwt.sign({ sub: user.email }, this.config.jwt.secret)
    ctx.body = { token }
  }

  async logout () {
    const ctx = this.ctx
    ctx.logout()
    ctx.body = { success: true }
  }
}

module.exports = LoginController
