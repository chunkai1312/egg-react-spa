import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { FaFacebookF as FacebookIcon } from 'react-icons/fa'
import Cookies from 'js-cookie'

const styles = theme => ({
  button: {
    margin: `${theme.spacing.unit}px 0`,
    textTransform: 'none'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
})

class LoginWithFacebook extends React.Component {
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
      <Button className={classes.button} fullWidth variant="outlined" color="primary" onClick={() => window.open('/api/oauth/facebook')}>
        <FacebookIcon className={classes.leftIcon} />
        {'Login with Facebook'}
      </Button>
    )
  }
}

LoginWithFacebook.propTypes = {
  classes: PropTypes.object.isRequired,
  onCallback: PropTypes.func.isRequired
}

export default withStyles(styles)(LoginWithFacebook)
