'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async me () {
    const ctx = this.ctx
    const user = await ctx.service.user.findByEmail(ctx.state.user.sub)
    if (!user) ctx.throw(401)
    ctx.body = user
  }
}

module.exports = UserController
