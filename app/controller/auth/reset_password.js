'use strict'

const Controller = require('egg').Controller

class ResetPasswordController extends Controller {
  async reset () {
    const ctx = this.ctx

    ctx.validate({
      email: { type: 'email' },
      token: { type: 'string' },
      password: { type: 'password' },
      password_confirmation: { type: 'password', compare: 'password' }
    })

    const { email, token, password } = ctx.request.body
    const pass = await ctx.model.PasswordReset.findOne({ where: { email, token } })
    if (!pass) ctx.throw(400, 'invalid token')

    const now = Date.now()
    const oneDay = 1000 * 60 * 60 * 24
    if ((now - pass.created_at) > oneDay) ctx.throw(403, 'invalid token')

    const user = await ctx.service.user.findByEmail(pass.email)
    user.password = password
    await user.save()

    ctx.body = { email: user.email, success: true }
  }
}

module.exports = ResetPasswordController
