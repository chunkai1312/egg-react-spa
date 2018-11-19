import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Loading = props => {
  const { classes, type, color } = props
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <ReactLoading type={type} color={color} />
      </div>
    </React.Fragment>
  )
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  color: PropTypes.string
}

Loading.defaultProps = {
  type: 'spinningBubbles',
  color: '#000000'
}

export default withStyles(styles)(Loading)
