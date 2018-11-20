'use strict'

const Service = require('egg').Service

class UserService extends Service {

  /**
   * Find an existing user.
   *
   * @param {String} id
   * @return {Promise}
   */
  async find (id) {
    const user = await this.ctx.model.User.findById(id)
    if (!user) this.ctx.throw(404, 'user not found')
    return user
  }

  /**
   * Find an existing user by email.
   *
   * @param {String} email
   * @return {Promise}
   */
  async findByEmail (email) {
    const user = await this.ctx.model.User.findOne({ where: { email } })
    if (!user) this.ctx.throw(404, 'user not found')
    return user
  }

  /**
   * Authenticate an existing user.
   *
   * @param {Object} credentials
   * @return {Promise}
   */
  async authenticate (credentials) {
    const user = await this.ctx.model.User.findOne({
      where: { email: credentials.email }
    })
    if (!user) this.ctx.throw(401, 'invalid login credentials')
    if (!user.authenticate(credentials.password)) this.ctx.throw(401, 'invalid login credentials')
    return user
  }

  /**
   * Create a new user.
   *
   * @param {Object} user
   * @return {Promise}
   */
  async create (user) {
    return this.ctx.model.User.create(user)
  }

  /**
   * Create a user from oauth provider.
   *
   * @param {Object} user
   * @return {Promise}
   */
  async createFromOauthProvider (user) {
    const [ authUser ] = await this.ctx.model.User.findOrCreate({
      where: { email: user.email },
      defaults: { email: user.email, name: user.displayName }
    })

    const [ oauth ] = await this.ctx.model.OauthProvider.findOrBuild({
      where: { user_id: authUser.id, provider: user.provider, provider_user_id: user.id },
      defaults: { user_id: authUser.id, provider: user.provider, provider_user_id: user.id }
    })
    oauth.access_token = user.accessToken || user.token
    oauth.refresh_token = user.refreshToken
    await oauth.save()

    return authUser
  }

  /**
   * Update an existing user.
   *
   * @param {String} id
   * @param {Object} updates
   * @return {Promise}
   */
  async update (id, updates) {
    const user = await this.ctx.model.User.findById(id)
    if (!user) this.ctx.throw(404, 'user not found')
    return user.update(updates)
  }

  /**
   * Destroy an existing user.
   *
   * @param {String} id
   * @return {Promise}
   */
  async destroy (id) {
    const user = await this.ctx.model.User.findById(id)
    if (!user) this.ctx.throw(404, 'user not found')
    return user.destroy()
  }

}

module.exports = UserService
