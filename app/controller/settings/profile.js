'use strict'

const Controller = require('egg').Controller

class ProfileController extends Controller {
  async update () {
    const ctx = this.ctx

    ctx.validate({
      name: { type: 'string' }
    })

    const user = await ctx.service.user.findByEmail(ctx.state.user.sub)
    const result = await ctx.service.user.update(user.id, ctx.request.body)
    ctx.body = { result }
  }
}

module.exports = ProfileController
