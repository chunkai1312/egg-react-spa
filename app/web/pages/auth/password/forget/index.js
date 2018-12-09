import React from 'react'
import PasswordForgotPage from './PasswordForgotPage'
import withRoot from '../../../withRoot'

function Page (props) {
  return <PasswordForgotPage {...props} />
}

export default withRoot(Page)
