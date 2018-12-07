import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
import AppWrapper from '../layouts/app1/AppWrapper'
import InfoIcon from '@material-ui/icons/Info'
import SettingsIcon from '@material-ui/icons/Settings'
import * as authActions from '../store/modules/auth'

const pages = [
  {
    pathname: '/',
    displayNav: false,
    title: false
  },
  {
    pathname: '/login',
    displayNav: false,
    title: false
  },
  {
    pathname: '/signup',
    displayNav: false,
    title: false
  },
  {
    pathname: '/password/forgot',
    displayNav: false,
    title: false
  },
  {
    pathname: '/password/reset/:token',
    displayNav: false,
    title: false
  },
  {
    pathname: '/about',
    title: 'About',
    icon: InfoIcon
  },
  {
    pathname: '/settings',
    title: 'Settings',
    icon: SettingsIcon
  }
]

function findActivePage (currentPages, match) {
  const activePage = find(currentPages, page => match.path === page.pathname)
  return activePage
}

function withRoot (Component) {
  class WithRoot extends React.Component {
    getChildContext () {
      const { match, auth } = this.props
      return {
        auth,
        pages,
        activePage: findActivePage(pages, match)
      }
    }

    render () {
      return (
        <AppWrapper>
          <Component {...this.props} />
        </AppWrapper>
      )
    }
  }

  WithRoot.propTypes = {
    match: PropTypes.object.isRequired
  }

  WithRoot.childContextTypes = {
    auth: PropTypes.object,
    pages: PropTypes.array,
    activePage: PropTypes.object
  }

  return connect(
    state => state.auth,
    dispatch => bindActionCreators(authActions, dispatch),
    (stateProps, dispatchProps, ownProps) => ({ ...ownProps, auth: { ...stateProps, ...dispatchProps } })
  )(WithRoot)
}

export default withRoot
