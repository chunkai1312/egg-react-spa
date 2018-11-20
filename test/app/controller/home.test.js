'use strict'

const { assert, app } = require('egg-mock/bootstrap')

describe('test/app/controller/home.test.js', () => {
  describe('GET /', () => {
    it('should work', async () => {
      const res = await app.httpRequest().get('/')
      assert(res.status === 200)
      assert(res.type === 'text/html')
    })
  })
})
