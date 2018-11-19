'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    const [ authUser ] = await ctx.model.User.findOrCreate({
      where: { email: user.email },
      defaults: { email: user.email, name: user.displayName }
    })

    const [ oauth ] = await ctx.model.OauthProvider.findOrBuild({
      where: { user_id: authUser.id, provider: user.provider, provider_user_id: user.id },
      defaults: { user_id: authUser.id, provider: user.provider, provider_user_id: user.id }
    })

    oauth.access_token = user.accessToken || user.token
    oauth.refresh_token = user.refreshToken
    await oauth.save()

    return user
  })

  app.passport.serializeUser(async (ctx, user) => user)
  app.passport.deserializeUser(async (ctx, user) => user)
}
