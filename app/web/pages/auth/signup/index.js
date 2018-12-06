import React from 'react'
import DocumentTitle from 'react-document-title'
import SignupPage from './SignupPage'
import withRoot from '../../withRoot'

function Signup () {
  return (
    <React.Fragment>
      <DocumentTitle title={`Register | Egg-React SPA`} />
      <SignupPage />
    </React.Fragment>
  )
}

export default withRoot(Signup)
