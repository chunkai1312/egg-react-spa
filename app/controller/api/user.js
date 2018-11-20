'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async me () {
    const ctx = this.ctx
    ctx.body = ctx.user
  }
}

module.exports = UserController
