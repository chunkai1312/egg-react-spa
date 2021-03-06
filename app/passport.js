'use strict' /* istanbul ignore next */

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    const { provider } = user

    if (provider === 'jwt') {
      if (ctx.user) return ctx.user

      const authUser = await ctx.service.user.find(user.payload.sub)
      return authUser
    }

    if (provider === 'google' || provider === 'facebook') {
      if (ctx.user) {
        const authUser = await ctx.service.user.linkOauthProvider(ctx.user.id, user)
        return authUser
      }

      const authUser = await ctx.service.user.createFromOauthProvider(user)
      return authUser
    }

    return user
  })

  app.passport.serializeUser(async (ctx, user) => user)
  app.passport.deserializeUser(async (ctx, user) => user)
}
