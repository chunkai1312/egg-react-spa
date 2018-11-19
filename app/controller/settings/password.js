'use strict'

const Controller = require('egg').Controller

class PasswordController extends Controller {
  async update () {
    const ctx = this.ctx

    ctx.validate({
      password: { type: 'password' },
      password_confirmation: { type: 'password', compare: 'password' }
    })

    const { password } = ctx.request.body
    const user = await ctx.service.user.findByEmail(ctx.state.user.sub)
    user.password = password
    await user.save()

    ctx.body = { success: true }
  }
}

module.exports = PasswordController
