import React from 'react'
import DocumentTitle from 'react-document-title'
import LoginPage from './LoginPage'
import withRoot from '../../withRoot'

function Login (props) {
  return (
    <React.Fragment>
      <DocumentTitle title={`Login | ${process.env.APP_TITLE}`} />
      <LoginPage {...props} />
    </React.Fragment>
  )
}

export default withRoot(Login)
