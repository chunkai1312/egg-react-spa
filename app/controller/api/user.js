'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {

  /**
   * GET /api/users/me
   */
  async me () {
    const ctx = this.ctx
    ctx.body = ctx.user
  }

}

module.exports = UserController
