import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import AppDrawer from './AppDrawer'
import AppHeader from './AppHeader'
import PageContext from '../../components/PageContext'
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

function AppFrame (props) {
  const { children, classes, auth } = props
  const [ mobileOpen, setMobileOpen ] = useState(false)
  const { activePage } = useContext(PageContext)
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const title = activePage.title ? `${activePage.title} | ${process.env.APP_NAME}` : process.env.APP_NAME
  const disablePermanent = !activePage.title && true

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DocumentTitle title={title} />
      {auth.authenticated ? (
        <React.Fragment>
          <nav className={classNames({ [classes.drawer]: !disablePermanent })}>
            <Hidden smUp={!disablePermanent} implementation="js">
              <AppDrawer
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            </Hidden>
            {disablePermanent ? null : (
              <Hidden xsDown implementation="css">
                <AppDrawer PaperProps={{ style: { width: drawerWidth } }} />
              </Hidden>
            )}
          </nav>
          <div className={classes.appContent}>
            <AppHeader onDrawerToggle={handleDrawerToggle} />
            <main className={classNames({ [classes.mainContent]: !disablePermanent })}>{children}</main>
          </div>
        </React.Fragment>
      ) : <main className={classes.appContent}>{children}</main>}
    </div>
  )
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default compose(
  withAuth,
  withStyles(styles)
)(AppFrame)
