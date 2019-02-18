import React, { useState } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  button: {},
  avatar: {
    width: 24,
    height: 24
  }
})

function AuthUserAvatar (props) {
  const { classes, auth: { user, logout } } = props
  const { t } = useTranslation()
  const [ open, setOpen ] = useState(false)
  const [ anchorEl, setAnchorEl ] = React.useState(null)

  const handleToggle = () => setOpen(!open)
  const handleClose = (event) => {
    if (anchorEl.contains(event.target)) return
    setOpen(false)
  }

  return (
    <React.Fragment>
      <IconButton
        className={classes.button}
        buttonRef={node => setAnchorEl(node)}
        aria-owns={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {user && user.photo_url
          ? <Avatar className={classes.avatar} alt="Avatar" src={user.photo_url} />
          : <Avatar className={classes.avatar}>{user.name.substr(0, 1)}</Avatar>
        }
      </IconButton>
      <Popper open={open} anchorEl={anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <MenuItem component={Link} to="/settings" onClick={handleClose}>
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

AuthUserAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object
}

export default compose(
  withAuth,
  withStyles(styles)
)(AuthUserAvatar)
