import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { FaGoogle as GoogleIcon } from 'react-icons/fa'

const styles = theme => ({
  button: {
    margin: `${theme.spacing.unit}px 0`,
    textTransform: 'none'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
})

class LoginWithGoogle extends React.Component {
  componentDidMount () {
    window.addEventListener('message', this.onMessage)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.onMessage)
  }

  onMessage = (e) => {
    if (e.origin !== window.origin || !e.data.token) {
      return
    }
    this.props.onCallback(e.data.token)
  }

  render () {
    const { classes } = this.props
    return (
      <Button className={classes.button} fullWidth variant="outlined" color="secondary" onClick={() => window.open('/api/oauth/google')}>
        <GoogleIcon className={classes.leftIcon} />
        {'Login with Google'}
      </Button>
    )
  }
}

LoginWithGoogle.propTypes = {
  classes: PropTypes.object.isRequired,
  onCallback: PropTypes.func.isRequired
}

export default withStyles(styles)(LoginWithGoogle)
