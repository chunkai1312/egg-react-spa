import React from 'react'
import HomePage from './HomePage'
import withRoot from '../withRoot'

function Page (props) {
  return <HomePage {...props} />
}

export default withRoot(Page)
