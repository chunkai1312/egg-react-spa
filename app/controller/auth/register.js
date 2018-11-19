'use strict'

const Controller = require('egg').Controller

class RegisterController extends Controller {
  async register () {
    const ctx = this.ctx

    ctx.validate({
      name: { type: 'string' },
      email: { type: 'email' },
      password: { type: 'password' },
      password_confirmation: { type: 'password', compare: 'password' }
    })

    const { name, email, password } = ctx.request.body
    const user = await ctx.model.User.create({ name, email, password })
    await ctx.login(user)

    ctx.body = user
  }
}

module.exports = RegisterController
