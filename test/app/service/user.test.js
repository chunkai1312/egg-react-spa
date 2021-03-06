'use strict'

const { assert, app } = require('egg-mock/bootstrap')

describe('test/app/service/user.test.js', () => {
  let ctx

  beforeEach(() => {
    ctx = app.mockContext()
  })

  describe('find()', () => {
    it('should find success', async () => {
      const user = await app.factory.create('user')
      const result = await ctx.service.user.find(user.id)
      assert(result.id === user.id)
    })

    it('should throw 404 error when id not exist', async () => {
      try {
        await ctx.service.user.find(0)
        throw new Error('should not execute')
      } catch (error) {
        assert(error.status === 404)
        assert(error.message === 'user not found')
      }
    })
  })

  describe('findByEmail()', () => {
    it('should find success', async () => {
      const user = await app.factory.create('user', { email: 'user@example.com' })
      const result = await ctx.service.user.findByEmail(user.email)
      assert(result.id === user.id)
      assert(result.email === user.email)
    })

    it('should throw 404 error when id not exist', async () => {
      try {
        await ctx.service.user.findByEmail('user@example.com')
        throw new Error('should not execute')
      } catch (error) {
        assert(error.status === 404)
        assert(error.message === 'user not found')
      }
    })
  })

  describe('authenticate()', () => {
    it('should authenticate success', async () => {
      const user = await app.factory.create('user', { email: 'user@example.com', password: '123456' })
      const result = await ctx.service.user.authenticate({ email: 'user@example.com', password: '123456' })
      assert(result.id === user.id)
      assert(result.email === user.email)
    })

    it('should throw 401 error when user not found', async () => {
      try {
        await await ctx.service.user.authenticate({ email: 'user@example.com', password: '123456' })
        throw new Error('should not execute')
      } catch (error) {
        assert(error.status === 401)
        assert(error.message === 'invalid login credentials')
      }
    })

    it('should throw 401 error when password mismatch', async () => {
      try {
        await app.factory.create('user', { email: 'user@example.com', password: '123456' })
        await await ctx.service.user.authenticate({ email: 'user@example.com', password: '000000' })
        throw new Error('should not execute')
      } catch (error) {
        assert(error.status === 401)
        assert(error.message === 'invalid login credentials')
      }
    })
  })

  describe('resetPasword()', () => {
    it('should reset password success', async () => {
      await app.factory.create('user', { email: 'user@example.com', password: '123456' })
      await app.factory.create('password_reset', { id: 1, email: 'user@example.com', token: '1234567890' })
      const result = await ctx.service.user.resetPassword({ email: 'user@example.com', token: '1234567890', password: '654321' })
      assert(result)
    })

    it('should throw 403 error when token does not exist', async () => {
      try {
        await app.factory.create('user', { email: 'user@example.com', password: '123456' })
        await app.factory.create('password_reset', { id: 1, email: 'user@example.com', token: '1234567890' })
        await ctx.service.user.resetPassword({ email: 'user@example.com', token: '0000000000', password: '654321' })
        throw new Error('should not execute')
      } catch (error) {
        assert(error.status === 403)
        assert(error.message === 'invalid token')
      }
    })

    it('should throw 403 error when token has expired', async () => {
      try {
        await app.factory.create('user', { email: 'user@example.com', password: '123456' })
        await app.factory.create('password_reset', { id: 1, email: 'user@example.com', token: '1234567890', created_at: '2000-01-01T00:00:00.000Z' })
        await ctx.service.user.resetPassword({ email: 'user@example.com', token: '1234567890', password: '654321' })
        throw new Error('should not execute')
      } catch (error) {
        assert(error.status === 403)
        assert(error.message === 'invalid token')
      }
    })
  })

  describe('create()', () => {
    it('should create success', async () => {
      const user = { name: 'user', email: 'user@example.com' }
      const created = await ctx.service.user.create(user)
      assert(created.id)
      assert(created.name === user.name)
      assert(created.email === user.email)
      assert(created.photo_url)
    })
  })

  describe('createFromOauthProvider()', () => {
    it('should create success', async () => {
      const user = { provider: 'github', id: '1', email: 'user@github.com', displayName: 'user' }
      const created = await ctx.service.user.createFromOauthProvider(user)
      assert(created.email === user.email)
    })
  })

  describe('linkOauthProvider()', () => {
    it('should link success', async () => {
      const user = await app.factory.create('user', { email: 'user@example.com', password: '123456' })
      const oauth = { id: '1234567890', provider: 'github', email: 'user@github.com', displayName: 'user' }
      const result = await ctx.service.user.linkOauthProvider(user.id, oauth)
      assert(result.providers.length === 1)
      assert(result.providers[0].user_id === user.id)
      assert(result.providers[0].provider === oauth.provider)
      assert(result.providers[0].provider_user_id === oauth.id)
    })
  })

  describe('unlinkOauthProvider()', () => {
    it('should unlink success', async () => {
      const user = await app.factory.create('user', { email: 'user@example.com', password: '123456' })
      const oauth = await app.factory.create('oauth_provider', { user_id: user.id, provider_id: '1234567890', provider: 'github', email: 'user@github.com' })
      const result = await ctx.service.user.unlinkOauthProvider(user.id, oauth)
      assert(result.providers.length === 0)
    })

    it('should not unlink when provider not found', async () => {
      const user = await app.factory.create('user', { email: 'user@example.com', password: '123456' })
      await app.factory.create('oauth_provider', { user_id: user.id, provider_id: '1234567890', provider: 'github', email: 'user@github.com' })
      const result = await ctx.service.user.unlinkOauthProvider(user.id, { provider: 'google' })
      assert(result.providers.length === 1)
    })
  })

  describe('update()', () => {
    it('should update success', async () => {
      const user = await app.factory.create('user', { name: 'user' })
      const updates = { name: 'admin' }
      const updated = await ctx.service.user.update(user.id, updates)
      assert(updated.id === user.id)
      assert(updated.name === updates.name)
    })

    it('should throw 404 when id not found', async () => {
      try {
        const updates = { name: 'admin' }
        await ctx.service.user.update(0, updates)
        throw new Error('should not execute')
      } catch (error) {
        assert(error.status === 404)
        assert(error.message === 'user not found')
      }
    })
  })

  describe('destroy()', () => {
    it('should delete success', async () => {
      const user = await app.factory.create('user')
      const result = await ctx.service.user.destroy(user.id)
      assert(result)
    })

    it('should throw 404 when id not found', async () => {
      try {
        await ctx.service.user.destroy(0)
        throw new Error('should not execute')
      } catch (error) {
        assert(error.status === 404)
        assert(error.message === 'user not found')
      }
    })
  })
})
