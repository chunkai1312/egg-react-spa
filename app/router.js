'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  const jwt = app.passport.authenticate('jwt', { session: false, successReturnToOrRedirect: null })

  router.post('/api/login', controller.api.auth.login)
  router.post('/api/logout', controller.api.auth.logout)
  router.post('/api/password/email', controller.api.auth.forgotPassword)
  router.post('/api/password/reset', controller.api.auth.resetPassword)

  router.get('/api/users/me', jwt, controller.api.user.me)
  router.patch('/api/settings/profile', jwt, controller.api.settings.updateProfile)
  router.patch('/api/settings/password', jwt, controller.api.settings.updatePassword)

  router.get('/api/oauth/google',
    app.passport.authenticate('google', {
      scope: ['profile', 'email'],
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
    controller.api.auth.oauth
  )

  router.get('/api/oauth/facebook',
    app.passport.authenticate('facebook', {
      authType: 'reauthenticate',
      authNonce: '{random-nonce}',
      scope: ['public_profile', 'email'],
      session: false
    })
  )

  router.get('/api/oauth/facebook/callback',
    app.passport.authenticate('facebook', {
      session: false,
      successReturnToOrRedirect: null
    }),
    controller.api.auth.oauth
  )

  router.get('*', controller.home.index)
}
