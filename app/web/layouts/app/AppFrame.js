import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CssBaseline from '@material-ui/core/CssBaseline'
import MenuIcon from '@material-ui/icons/Menu'
import AppDrawer from './AppDrawer'
import AuthUserAvatar from './AuthUserAvatar'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  grow: {
    flex: '1 1 auto'
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto'
  },
  appBar: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute'
    }
  },
  appBarHome: {
    boxShadow: 'none'
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)'
    }
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: 250
    }
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  authUserAvatar: {
    width: 24,
    height: 24
  }
})

class AppFrame extends React.Component {
  state = {
    mobileOpen: false
  }

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true })
  }

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false })
  }

  render () {
    const { children, classes } = this.props
    const { auth, activePage } = this.context

    if (!activePage) {
      throw new Error('Missing activePage.')
    }

    const title = activePage.title !== false ? this.context.activePage.title : null
    let disablePermanent = false
    let navIconClassName = ''
    let appBarClassName = classes.appBar

    if (title === null) {
      // home route, don't shift app bar or dock drawer
      disablePermanent = true
      appBarClassName += ` ${classes.appBarHome}`
    } else {
      navIconClassName = classes.navIconHide
      appBarClassName += ` ${classes.appBarShift}`
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={appBarClassName}>
          <Toolbar>
            {auth.authenticated && (
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={navIconClassName}
              >
                <MenuIcon />
              </IconButton>
            )}
            {title !== null && (
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                {title}
              </Typography>
            )}
            <div className={classes.grow} />
            {auth.authenticated && auth.user && <AuthUserAvatar />}
          </Toolbar>
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          disablePermanent={disablePermanent}
          onClose={this.handleDrawerClose}
          onOpen={this.handleDrawerOpen}
          mobileOpen={this.state.mobileOpen}
        />
        {children}
      </div>
    )
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
}

AppFrame.contextTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired,
  activePage: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default compose(
  withStyles(styles)
)(AppFrame)
