import React from 'react'
import DocumentTitle from 'react-document-title'
import PasswordResetPage from './PasswordResetPage'
import withRoot from '../../../withRoot'

function PasswordReset () {
  return (
    <React.Fragment>
      <DocumentTitle title={`Reset your password | Egg-React SPA`} />
      <PasswordResetPage />
    </React.Fragment>
  )
}

export default withRoot(PasswordReset)
