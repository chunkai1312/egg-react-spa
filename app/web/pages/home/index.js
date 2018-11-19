import React from 'react'
import DocumentTitle from 'react-document-title'
import HomePage from './HomePage'
import withRoot from '../withRoot'

function Home () {
  return (
    <React.Fragment>
      <DocumentTitle title={`Home | Egg-React SPA`} />
      <HomePage />
    </React.Fragment>
  )
}

export default withRoot(Home)
