import React from 'react'
import AboutPage from './AboutPage'
import withRoot from '../withRoot'

function Page (props) {
  return <AboutPage {...props} />
}

export default withRoot(Page)
