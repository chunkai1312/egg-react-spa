'use strict'

const { app } = require('egg-mock/bootstrap')

describe('test/app/service/mailer.test.js', () => {
  let ctx

  beforeEach(() => {
    ctx = app.mockContext()
  })

  describe('sendMail()', () => {
    it('should ok', async () => {
      await ctx.service.mailer.sendMail()
    })
  })

  describe('sendPasswordResetMail()', () => {
    it('should ok', async () => {
      await ctx.service.mailer.sendPasswordResetMail({ name: 'user', email: 'user@example.com' })
    })
  })
})
