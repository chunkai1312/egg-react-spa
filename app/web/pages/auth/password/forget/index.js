import React from 'react'
import DocumentTitle from 'react-document-title'
import PasswordForgotPage from './PasswordForgotPage'
import withRoot from '../../../withRoot'

function PasswordForgot () {
  return (
    <React.Fragment>
      <DocumentTitle title={`Forgot your password? | Egg-React SPA`} />
      <PasswordForgotPage />
    </React.Fragment>
  )
}

export default withRoot(PasswordForgot)
