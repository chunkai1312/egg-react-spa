import React from 'react'
import AppWrapper from '../layouts/app/AppWrapper'
import InfoIcon from '@material-ui/icons/Info'
import SettingsIcon from '@material-ui/icons/Settings'
import { PageContextProvider } from '../components/PageContext'

const pages = [
  { pathname: '/', title: false, displayNav: false },
  { pathname: '/login', title: false, displayNav: false },
  { pathname: '/signup', title: false, displayNav: false },
  { pathname: '/password/forgot', title: false, displayNav: false },
  { pathname: '/password/reset/:token', title: false, displayNav: false },
  { pathname: '/about', title: 'About', icon: InfoIcon },
  { pathname: '/settings', title: 'Settings', icon: SettingsIcon }
]

function withRoot (Component) {
  const ComponentWithRoot = props => (
    <PageContextProvider pages={pages} match={props.match}>
      <AppWrapper>
        <Component {...props} />
      </AppWrapper>
    </PageContextProvider>
  )
  return ComponentWithRoot
}

export default withRoot
