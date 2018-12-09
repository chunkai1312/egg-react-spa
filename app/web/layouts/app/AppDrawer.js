import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { withPageContext } from '../../components/PageContext'
import withAuth from '../../components/withAuth'

const styles = theme => ({
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    borderRight: 0
  },
  grow: {
    flex: '1 1 auto'
  },
  icon: {
    marginRight: theme.spacing.unit,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  title: {
    textDecoration: 'none'
  },
  user: {
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
  profile: {
    position: 'relative',
    top: 15
  },
  avatar: {
    width: 48,
    height: 48
  },
  navItem: theme.mixins.gutters({
    borderRadius: 0,
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest
    }),
    '&:hover': {
      textDecoration: 'none'
    }
  }),
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  footer: {
    [theme.breakpoints.down('sm')]: {
      padding: `15px ${theme.spacing.unit * 2}px`
    },
    [theme.breakpoints.up('sm')]: {
      padding: `15px ${theme.spacing.unit * 3}px`
    }
  }
})

function AppDrawer (props) {
  const { classes, title, icon, pages, activePage, auth: { user }, ...other } = props
  const navItems = pages
    .filter(page => page.displayNav !== false)
    .map(page => (page.pathname === activePage.pathname) ? { ...page, active: true } : page)

  return (
    <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.paper }} {...other}>
      <AppBar position="static">
        <Toolbar>
          {icon && <Avatar component={Link} to="/" className={classes.icon} src={icon} />}
          <Typography component={Link} to="/" variant="h6" color="inherit" className={classes.title} noWrap>{title}</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.user}>
        {user && user.photo_url
          ? <Avatar className={classes.avatar} alt="Avatar" src={user.photo_url} />
          : <Avatar className={classes.avatar}>{user && user.name.substr(0, 1)}</Avatar>}
        <div className={classes.profile}>
          <Typography variant="body1">{user && user.name}</Typography>
          <Typography variant="body2">{user && user.email}</Typography>
        </div>
      </div>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem
            key={index}
            component={Link}
            to={item.pathname}
            className={classNames(classes.item, { [classes.active]: item.active })}
            button
            disableRipple
          >
            <ListItemIcon className={classNames({ [classes.active]: item.active })}>
              <item.icon />
            </ListItemIcon>
            <ListItemText disableTypography primary={item.title} />
          </ListItem>
        ))}
      </List>
      <div className={classes.grow} />
      <div className={classes.footer}>
        <Typography variant="caption" color="textSecondary">
          {process.env.APP_NAME}&ensp;{`v${process.env.APP_VERSION}`}
        </Typography>
      </div>
    </Drawer>
  )
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  pages: PropTypes.array.isRequired,
  activePage: PropTypes.object.isRequired
}

AppDrawer.defaultProps = {
  title: process.env.APP_TITLE,
  icon: require('../../assets/img/logo.svg')
}

export default compose(
  withAuth,
  withPageContext,
  withStyles(styles)
)(AppDrawer)
