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
    const user = await ctx.model.User.create({ name, email, password })
    await ctx.login(user)

    ctx.body = user
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
    if (!user) ctx.throw(404, 'user not found')

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

  /**
   * GET /api/oauth/:provider/callback
   */
  async oauth () {
    const ctx = this.ctx
    const token = this.app.jwt.sign({ sub: ctx.user.id }, this.config.jwt.secret)
    ctx.body = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authenticated</title>
      </head>
      <body>
        Authenticated successfully.
        <script type="text/javascript">
          window.opener.postMessage({ token: "${token}" });
          window.close();
        </script>
      </body>
      </html>
    `
  }

}

module.exports = AuthController
