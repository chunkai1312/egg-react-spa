import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  avatar: {
    marginRight: theme.spacing.unit,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  title: {},
  version: {
    marginTop: 5
  },
  toolbar: {
    display: 'flex'
  },
  grow: {
    flex: '1 1 auto'
  }
})

function AppTitle (props) {
  const { classes, title, version, icon, onIconClick } = props
  return (
    <div className={classes.toolbar}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {icon && <Avatar
            component={Link}
            to={'/'}
            className={classes.avatar}
            src={icon}
            onClick={onIconClick}
          />}
          <Typography variant="h6" color="inherit" className={classes.title} noWrap>{title}</Typography>
          <div className={classes.grow} />
          <Typography variant="caption" color="inherit" className={classes.version}>{`v${version}`}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

AppTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  version: PropTypes.string,
  icon: PropTypes.string,
  onIconClick: PropTypes.func
}

AppTitle.defaultProps = {
  icon: null,
  title: process.env.APP_NAME || 'Egg-React',
  version: process.env.APP_VERSION || `0.0.0`,
  onIconClick: () => {}
}

export default withStyles(styles)(AppTitle)
