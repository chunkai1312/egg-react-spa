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
  title: {
    textDecoration: 'none'
  },
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
  const { className, classes, title, icon, onIconClick } = props
  return (
    <AppBar className={className} position="static">
      <Toolbar className={classes.toolbar}>
        {icon && <Avatar component={Link} to="/" className={classes.avatar} src={icon} onClick={onIconClick} />}
        <Typography component={Link} to="/" variant="h6" color="inherit" className={classes.title} noWrap>{title}</Typography>
      </Toolbar>
    </AppBar>
  )
}

AppTitle.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onIconClick: PropTypes.func
}

AppTitle.defaultProps = {
  icon: null,
  title: process.env.APP_TITLE,
  onIconClick: () => {}
}

export default withStyles(styles)(AppTitle)
