import React from 'react'
import DocumentTitle from 'react-document-title'
import AboutPage from './AboutPage'
import withRoot from '../withRoot'

function About (props) {
  return (
    <React.Fragment>
      <DocumentTitle title={`About | ${process.env.APP_TITLE}`} />
      <AboutPage {...props} />
    </React.Fragment>
  )
}

export default withRoot(About)
