import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import AppDrawer from './AppDrawer'
import AppHeader from './AppHeader'
import { withPageContext } from '../../components/PageContext'
import withAuth from '../../components/withAuth'

const drawerWidth = 256

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  mainContent: {
    flex: 1,
    padding: '48px 36px 0'
  }
})

class AppFrame extends React.Component {
  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  render () {
    const { children, classes, auth, activePage } = this.props

    if (!activePage) {
      throw new Error('Missing activePage.')
    }

    const disablePermanent = !activePage.title && true

    return (
      <div className={classes.root}>
        <CssBaseline />
        {auth.authenticated ? (
          <React.Fragment>
            <nav className={classNames({ [classes.drawer]: !disablePermanent })}>
              <Hidden smUp={!disablePermanent} implementation="js">
                <AppDrawer
                  PaperProps={{ style: { width: drawerWidth } }}
                  variant="temporary"
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle}
                />
              </Hidden>
              {disablePermanent ? null : (
                <Hidden xsDown implementation="css">
                  <AppDrawer PaperProps={{ style: { width: drawerWidth } }} />
                </Hidden>
              )}
            </nav>
            <div className={classes.appContent}>
              <AppHeader onDrawerToggle={this.handleDrawerToggle} />
              <main className={classNames({ [classes.mainContent]: !disablePermanent })}>{children}</main>
            </div>
          </React.Fragment>
        ) : <main className={classes.appContent}>{children}</main>}
      </div>
    )
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  activePage: PropTypes.object.isRequired
}

export default compose(
  withAuth,
  withPageContext,
  withStyles(styles)
)(AppFrame)
