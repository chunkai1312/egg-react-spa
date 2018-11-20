'use strict'

const { assert, app } = require('egg-mock/bootstrap')

describe('test/app/controller/api/auth.test.js', () => {
  describe('POST /api/login', () => {
    it('should work', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com', password: '123456' })
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/login')
        .send({ email: 'user@example.com', password: '123456' })
      assert(res.status === 200)
    })

    it('should throw 401 error when invalid login', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com', password: '123456' })
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/login')
        .send({ email: 'user@example.com', password: '654321' })
      assert(res.status === 401)
    })

    it('should throw 422 error when invalid param', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com', password: '123456' })
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/login')
        .send({ email: 'user@example.com' })
      assert(res.status === 422)
    })
  })

  describe('POST /api/logout', () => {
    it('should work', async () => {
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/logout')
      assert(res.status === 200)
    })
  })

  describe('POST /api/signup', () => {
    it('should work', async () => {
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/signup')
        .send({
          name: 'user',
          email: 'user@example.com',
          password: '123456',
          password_confirmation: '123456'
        })
      assert(res.status === 200)
    })

    it('should throw 422 error when invalid param', async () => {
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/signup')
        .send({
          name: 'user',
          email: 'user@example.com',
          password: '123456',
          password_confirmation: '654321'
        })
      assert(res.status === 422)
    })
  })

  describe('POST /api/password/email', () => {
    it('should work', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com', password: '123456' })
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/password/email')
        .send({ email: 'user@example.com' })
      assert(res.status === 200)
    })

    it('should throw 404 error when email does not exist', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com', password: '123456' })
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/password/email')
        .send({ email: 'test@example.com' })
      assert(res.status === 404)
    })

    it('should throw 422 error when invalid param', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com', password: '123456' })
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/password/email')
        .send({ username: 'user' })
      assert(res.status === 422)
    })
  })

  describe('POST /api/password/reset', () => {
    it('should work', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com', password: '123456' })
      await app.factory.create('password_reset', { id: 1, email: 'user@example.com', token: '1234567890' })
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/password/reset')
        .send({
          email: 'user@example.com',
          token: '1234567890',
          password: '123456',
          password_confirmation: '123456'
        })
      assert(res.status === 200)
    })

    it('should throw 403 error when token does not exist', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com', password: '123456' })
      await app.factory.create('password_reset', { id: 1, email: 'user@example.com', token: '1234567890' })
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/password/reset')
        .send({
          email: 'user@example.com',
          token: '0000000000',
          password: '123456',
          password_confirmation: '123456'
        })
      assert(res.status === 403)
    })

    it('should throw 403 error when token has expired', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com', password: '123456' })
      await app.factory.create('password_reset', { id: 1, email: 'user@example.com', token: '1234567890', created_at: '2000-01-01T00:00:00.000Z' })
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/password/reset')
        .send({
          email: 'user@example.com',
          token: '1234567890',
          password: '123456',
          password_confirmation: '123456'
        })
      assert(res.status === 403)
    })

    it('should throw 422 error when invalid param', async () => {
      await app.factory.create('user', { id: 1, name: 'user', email: 'user@example.com', password: '123456' })
      await app.factory.create('password_reset', { id: 1, email: 'user@example.com', token: '1234567890' })
      app.mockCsrf()
      const res = await app.httpRequest().post('/api/password/reset')
        .send({
          email: 'user@example.com',
          token: '1234567890',
          password: '123456'
        })
      assert(res.status === 422)
    })
  })
})
