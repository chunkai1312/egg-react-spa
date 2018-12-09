import React from 'react'
import DocumentTitle from 'react-document-title'
import HomePage from './HomePage'
import withRoot from '../withRoot'

function Home (props) {
  return (
    <React.Fragment>
      <DocumentTitle title={`Home | ${process.env.APP_TITLE}`} />
      <HomePage {...props} />
    </React.Fragment>
  )
}

export default withRoot(Home)
