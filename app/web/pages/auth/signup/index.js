import React from 'react'
import DocumentTitle from 'react-document-title'
import SignupPage from './SignupPage'
import withRoot from '../../withRoot'

function Signup (props) {
  return (
    <React.Fragment>
      <DocumentTitle title={`Register | ${process.env.APP_TITLE}`} />
      <SignupPage {...props} />
    </React.Fragment>
  )
}

export default withRoot(Signup)
