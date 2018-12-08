import React from 'react'
import DocumentTitle from 'react-document-title'
import HomePage from './HomePage'
import withRoot from '../withRoot'

function Home () {
  return (
    <React.Fragment>
      <DocumentTitle title={`Home | ${process.env.APP_TITLE}`} />
      <HomePage />
    </React.Fragment>
  )
}

export default withRoot(Home)
