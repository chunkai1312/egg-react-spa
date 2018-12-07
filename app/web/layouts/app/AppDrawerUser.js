import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  userInfo: {
    [theme.breakpoints.down('sm')]: {
      padding: `15px ${theme.spacing.unit * 2}px`
    },
    [theme.breakpoints.up('sm')]: {
      padding: `15px ${theme.spacing.unit * 3}px`
    },
    height: 135,
    backgroundColor: theme.palette.primary[50],
    backgroundImage: `url(${require('../../assets/img/bg.png')})`,
    backgroundSize: 'cover'
  },
  info: {
    position: 'relative',
    top: 15
  },
  avatar: {
    width: 48,
    height: 48
  },
  userSettingsContainer: {
    position: 'absolute',
    right: -15,
    bottom: -15
  }
})

function AppUser (props, context) {
  const { classes } = props
  const { auth: { user } } = context
  return (
    <div className={classes.userInfo}>
      {user && user.photo_url
        ? <Avatar className={classes.avatar} alt="Avatar" src={user.photo_url} />
        : <Avatar className={classes.avatar}>{user && user.name.substr(0, 1)}</Avatar>}
      <div className={classes.info}>
        <Typography variant="body1">{user && user.name}</Typography>
        <Typography variant="body2">{user && user.email}</Typography>
      </div>
    </div>
  )
}

AppUser.propTypes = {
  classes: PropTypes.object.isRequired
}

AppUser.contextTypes = {
  auth: PropTypes.object
}

export default withStyles(styles)(AppUser)
