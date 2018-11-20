'use strict'

const Controller = require('egg').Controller

class SettingsController extends Controller {
  async updateProfile () {
    const ctx = this.ctx

    ctx.validate({
      name: { type: 'string' }
    })

    const user = await ctx.service.user.find(ctx.user.id)
    const result = await ctx.service.user.update(user.id, ctx.request.body)
    ctx.body = { result }
  }

  async updatePassword () {
    const ctx = this.ctx

    ctx.validate({
      password: { type: 'password' },
      password_confirmation: { type: 'password', compare: 'password' }
    })

    const { password } = ctx.request.body
    const user = await ctx.service.user.find(ctx.user.id)
    user.password = password
    await user.save()

    ctx.body = { success: true }
  }
}

module.exports = SettingsController
