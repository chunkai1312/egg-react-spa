'use strict'

const Controller = require('egg').Controller

class ForgotPasswordController extends Controller {
  async sendResetLinkEmail () {
    const ctx = this.ctx

    ctx.validate({
      email: { type: 'email' }
    })

    const email = ctx.request.body.email
    const user = await ctx.service.user.findByEmail(email)
    if (!user) ctx.throw(404, 'user not found')

    await ctx.service.mailer.sendResetLinkEmail(user)
    ctx.body = { email, sucess: true }
  }
}

module.exports = ForgotPasswordController
