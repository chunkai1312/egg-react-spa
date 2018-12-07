import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import AppDrawerTitle from './AppDrawerTitle'
import AppDrawerUser from './AppDrawerUser'
import AppDrawerNavItem from './AppDrawerNavItem'

const styles = theme => ({
  nav: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  grow: {
    flex: '1 1 auto'
  },
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    borderRight: 0
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

function AppDrawer (props, context) {
  const { classes, ...other } = props
  const pages = context.pages.filter(page => page.displayNav !== false)

  return (
    <Drawer variant="permanent" classes={{ paper: classes.paper }} {...other}>
      <div className={classes.nav}>
        <AppDrawerTitle />
        <AppDrawerUser />
        <Divider />
        <List>
          {pages.map((page, index) => (
            <AppDrawerNavItem
              key={index}
              title={page.title}
              icon={page.icon}
              href={page.pathname}
              onClick={props.onClose}
              active={page.pathname === context.activePage.pathname}
            />
          ))}
        </List>
        <div className={classes.grow} />
        <div className={classes.footer}>
          <Typography variant="caption" color="textSecondary">
            {process.env.APP_NAME}&ensp;{`v${process.env.APP_VERSION}`}
          </Typography>
        </div>
      </div>
    </Drawer>
  )
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

AppDrawer.contextTypes = {
  pages: PropTypes.array.isRequired,
  activePage: PropTypes.object.isRequired
}

export default withStyles(styles)(AppDrawer)
