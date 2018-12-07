'use strict'

const Controller = require('egg').Controller

class AuthController extends Controller {

  /**
   * POST /api/login
   */
  async login () {
    const ctx = this.ctx

    ctx.validate({
      email: { type: 'email' },
      password: { type: 'password' }
    })

    const credentials = ctx.request.body
    const user = await ctx.service.user.authenticate(credentials)
    await ctx.login(user)

    const token = this.app.jwt.sign({ sub: user.id }, this.config.jwt.secret)
    ctx.body = { token }
  }

  /**
   * POST /api/logout
   */
  async logout () {
    const ctx = this.ctx
    ctx.logout()
    ctx.body = { success: true }
  }

  /**
   * POST /api/signup
   */
  async signup () {
    const ctx = this.ctx

    ctx.validate({
      name: { type: 'string' },
      email: { type: 'email' },
      password: { type: 'password' },
      password_confirmation: { type: 'password', compare: 'password' }
    })

    const { name, email, password } = ctx.request.body
    const user = await ctx.service.user.create({ name, email, password })
    await ctx.login(user)

    const token = this.app.jwt.sign({ sub: user.id }, this.config.jwt.secret)
    ctx.body = { token }
  }

  /**
   * POST /api/password/email
   */
  async forgotPassword () {
    const ctx = this.ctx

    ctx.validate({
      email: { type: 'email' }
    })

    const email = ctx.request.body.email
    const user = await ctx.service.user.findByEmail(email)
    await ctx.service.mailer.sendPasswordResetMail(user)

    ctx.body = { email, sucess: true }
  }

  /**
   * POST /api/password/reset
   */
  async resetPassword () {
    const ctx = this.ctx

    ctx.validate({
      email: { type: 'email' },
      token: { type: 'string' },
      password: { type: 'password' },
      password_confirmation: { type: 'password', compare: 'password' }
    })

    const { email, token, password } = ctx.request.body
    await ctx.service.user.resetPassword({ email, token, password })

    ctx.body = { email, success: true }
  }

  /* istanbul ignore next */
  /**
   * GET /api/oauth/:provider/callback
   */
  async oauth () {
    const ctx = this.ctx
    const token = this.app.jwt.sign({ sub: ctx.user.id }, this.config.jwt.secret)
    await this.ctx.render('oauth_callback.html', { token })
  }

}

module.exports = AuthController
