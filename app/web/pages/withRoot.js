import React from 'react'
import find from 'lodash/find'
import AppWrapper from '../layouts/app/AppWrapper'
import InfoIcon from '@material-ui/icons/Info'
import SettingsIcon from '@material-ui/icons/Settings'
import PageContext from '../components/PageContext'

const pages = [
  { pathname: '/', title: false, displayNav: false },
  { pathname: '/login', title: false, displayNav: false },
  { pathname: '/signup', title: false, displayNav: false },
  { pathname: '/password/forgot', title: false, displayNav: false },
  { pathname: '/password/reset/:token', title: false, displayNav: false },
  { pathname: '/about', title: 'About', icon: InfoIcon },
  { pathname: '/settings', title: 'Settings', icon: SettingsIcon }
]

function findActivePage (currentPages, match) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return match.path.indexOf(`${page.pathname}/`) === 0
    }

    // Should be an exact match if no children
    return match.path === page.pathname
  })

  if (!activePage) {
    return null
  }

  // We need to drill down
  if (activePage.pathname !== match.path) {
    return findActivePage(activePage.children, match)
  }

  return activePage
}

function withRoot (Component) {
  const ComponentWithRoot = props => (
    <PageContext.Provider value={{ pages, activePage: findActivePage(pages, props.match) }}>
      <AppWrapper>
        <Component {...props} />
      </AppWrapper>
    </PageContext.Provider>
  )
  return ComponentWithRoot
}

export default withRoot
