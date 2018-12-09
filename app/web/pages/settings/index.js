import React from 'react'
import SettingsPage from './SettingsPage'
import withRoot from '../withRoot'

function Page (props) {
  return <SettingsPage {...props} />
}

export default withRoot(Page)
