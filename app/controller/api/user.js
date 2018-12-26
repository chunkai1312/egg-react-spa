'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {

  /**
   * GET /api/users/me
   */
  async me () {
    const ctx = this.ctx
    const data = await ctx.service.user.find(ctx.user.id)
    ctx.body = data
  }

}

module.exports = UserController
