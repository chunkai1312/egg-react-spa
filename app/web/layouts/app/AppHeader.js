import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import AppUserAvatar from './AppUserAvatar'
import AppLanguageSelector from './AppLanguageSelector'
import PageContext from '../../components/PageContext'
import withAuth from '../../components/withAuth'

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

function AppHeader (props) {
  const { classes, onDrawerToggle, auth } = props
  const { activePage } = useContext(PageContext)
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

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default compose(
  withAuth,
  withStyles(styles)
)(AppHeader)
