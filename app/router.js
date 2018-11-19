'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  router.get('/api/users/me', app.jwt, controller.api.user.me)
  router.post('/api/login', controller.auth.login.login)
  router.post('/api/logout', controller.auth.login.logout)
  router.post('/api/password/email', controller.auth.forgotPassword.sendResetLinkEmail)
  router.post('/api/password/reset', controller.auth.resetPassword.reset)

  router.patch('/api/settings/profile', app.jwt, controller.settings.profile.update)
  router.patch('/api/settings/password', app.jwt, controller.settings.password.update)

  router.get('/api/oauth/google',
    app.passport.authenticate('google', {
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/adwords'],
      accessType: 'offline',
      prompt: 'consent',
      session: false
    })
  )

  router.get('/api/oauth/google/callback',
    app.passport.authenticate('google', {
      session: false,
      successReturnToOrRedirect: null
    }),
    controller.auth.oauth.provider
  )

  router.get('/api/oauth/facebook',
    app.passport.authenticate('facebook', {
      authType: 'reauthenticate',
      authNonce: '{random-nonce}',
      scope: ['public_profile', 'email', 'ads_management', 'ads_read'],
      session: false
    })
  )

  router.get('/api/oauth/facebook/callback',
    app.passport.authenticate('facebook', {
      session: false,
      successReturnToOrRedirect: null
    }),
    controller.auth.oauth.provider
  )

  router.get('*', controller.home.index)
}
