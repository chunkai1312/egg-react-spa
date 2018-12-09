import React from 'react'
import LoginPage from './LoginPage'
import withRoot from '../../withRoot'

function Page (props) {
  return <LoginPage {...props} />
}

export default withRoot(Page)
