import React from 'react'
import PasswordResetPage from './PasswordResetPage'
import withRoot from '../../../withRoot'

function Page (props) {
  return <PasswordResetPage {...props} />
}

export default withRoot(Page)
