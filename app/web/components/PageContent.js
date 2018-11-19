import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 80,
    flex: '1 1 100%',
    maxWidth: '100vw',
    margin: '0 auto'
  }),
  [theme.breakpoints.up(1280)]: {
    root: {
      maxWidth: `calc(100vw - ${theme.spacing.unit * 16 + 250}px)`,
      marginTop: theme.spacing.unit * 4,
      marginRight: theme.spacing.unit * 8,
      marginBottom: theme.spacing.unit * 8
    }
  }
})

function PageContent (props) {
  const { className, classes, children } = props

  return <div className={classNames(classes.root, className)}>{children}</div>
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default withStyles(styles)(PageContent)
