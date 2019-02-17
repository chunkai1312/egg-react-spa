import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import withAuth from '../../components/withAuth'

const styles = theme => ({
  button: {
    // padding: 0
  },
  avatar: {
    width: 24,
    height: 24
  }
})

class AuthUserAvatar extends React.Component {
  state = {
    open: false
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }
    this.setState({ open: false })
  }

  render () {
    const { t, classes, auth: { user, logout } } = this.props
    const { open } = this.state
    return (
      <React.Fragment>
        <IconButton
          className={classes.button}
          buttonRef={node => {
            this.anchorEl = node
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          {user && user.photo_url
            ? <Avatar className={classes.avatar} alt="Avatar" src={user.photo_url} />
            : <Avatar className={classes.avatar}>{user.name.substr(0, 1)}</Avatar>
          }
        </IconButton>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem component={Link} to="/settings" onClick={this.handleClose}>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('settings')} />
                    </MenuItem>
                    <MenuItem onClick={() => logout()}>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('logout')} />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    )
  }
}

AuthUserAvatar.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object
}

export default compose(
  withTranslation(),
  withAuth,
  withStyles(styles)
)(AuthUserAvatar)
