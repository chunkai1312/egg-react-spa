import React from 'react'
import SignupPage from './SignupPage'
import withRoot from '../../withRoot'

function Page (props) {
  return <SignupPage {...props} />
}

export default withRoot(Page)
