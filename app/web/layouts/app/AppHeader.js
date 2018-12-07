import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import AppUserAvatar from './AppUserAvatar'
import AppLanguageSelector from './AppLanguageSelector'

const styles = theme => ({
  title: {
    marginLeft: 24,
    flex: '0 1 auto'
  },
  navIconHide: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  grow: {
    flex: '1 1 auto'
  }
})

function Header (props, context) {
  const { classes, onDrawerToggle } = props
  const { auth, activePage } = context

  if (!activePage) {
    throw new Error('Missing activePage.')
  }

  const title = activePage.title || null

  return (
    <AppBar color="primary" position={!title ? 'fixed' : 'sticky'} elevation={!title ? 0 : undefined}>
      <Toolbar>
        {auth.authenticated && (
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={onDrawerToggle}
            className={classNames({ [classes.navIconHide]: title })}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
        <div className={classes.grow} />
        {auth.authenticated && <AppLanguageSelector />}
        {auth.authenticated && auth.user && <AppUserAvatar />}
      </Toolbar>
    </AppBar>
  )
}

Header.contextTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired,
  activePage: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
}

export default withStyles(styles)(Header)
