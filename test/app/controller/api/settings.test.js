'use strict'

const { assert, app } = require('egg-mock/bootstrap')

describe('test/app/controller/api/settings.test.js', () => {
  let token

  before(() => {
    token = app.jwt.sign({ sub: 1 }, app.config.jwt.secret)
  })

  describe('PATCH /api/settings/profile', () => {
    it('should work', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com' })
      app.mockCsrf()
      const res = await app.httpRequest().patch('/api/settings/profile')
        .set({ 'Authorization': `Bearer ${token}` })
        .send({ name: 'admin' })
      assert(res.status === 200)
    })
  })

  describe('PATCH /api/settings/password', () => {
    it('should work', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com', password: '123456' })
      app.mockCsrf()
      const res = await app.httpRequest().patch('/api/settings/password')
        .set({ 'Authorization': `Bearer ${token}` })
        .send({ password: '654321', password_confirmation: '654321' })
      assert(res.status === 200)
    })
  })
})
