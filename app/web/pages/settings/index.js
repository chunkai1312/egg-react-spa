import React from 'react'
import DocumentTitle from 'react-document-title'
import SettingsPage from './SettingsPage'
import withRoot from '../withRoot'

function Settings () {
  return (
    <React.Fragment>
      <DocumentTitle title={`Settings | Egg-React SPA`} />
      <SettingsPage />
    </React.Fragment>
  )
}

export default withRoot(Settings)
