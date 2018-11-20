'use strict'

const { assert, app } = require('egg-mock/bootstrap')

describe('test/app/controller/api/user.test.js', () => {
  let token

  before(() => {
    token = app.jwt.sign({ sub: 1 }, app.config.jwt.secret)
  })

  describe('GET /api/users/me', () => {
    it('should work', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com' })

      const res = await app.httpRequest().get('/api/users/me')
        .set({ 'Authorization': `Bearer ${token}` })
      assert(res.status === 200)
      assert(res.body.id === 1)
      assert(res.body.name === 'user')
      assert(res.body.email === 'user@example.com')
    })
  })
})
