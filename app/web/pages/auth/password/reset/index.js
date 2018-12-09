import React from 'react'
import DocumentTitle from 'react-document-title'
import PasswordResetPage from './PasswordResetPage'
import withRoot from '../../../withRoot'

function PasswordReset (props) {
  return (
    <React.Fragment>
      <DocumentTitle title={`Reset your password | ${process.env.APP_TITLE}`} />
      <PasswordResetPage {...props} />
    </React.Fragment>
  )
}

export default withRoot(PasswordReset)
