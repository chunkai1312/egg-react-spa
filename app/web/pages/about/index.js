import React from 'react'
import DocumentTitle from 'react-document-title'
import AboutPage from './AboutPage'
import withRoot from '../withRoot'

function About () {
  return (
    <React.Fragment>
      <DocumentTitle title={`About | Egg-React SPA`} />
      <AboutPage />
    </React.Fragment>
  )
}

export default withRoot(About)
