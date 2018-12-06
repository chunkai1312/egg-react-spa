import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withNamespaces } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { FaGoogle as GoogleIcon } from 'react-icons/fa'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
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
    const { t, classes } = this.props
    return (
      <Button className={classes.button} fullWidth variant="outlined" color="secondary" onClick={() => window.open('/api/oauth/google')}>
        <GoogleIcon className={classes.leftIcon} />
        {t('login_with', { oauth: 'Google' })}
      </Button>
    )
  }
}

LoginWithGoogle.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onCallback: PropTypes.func.isRequired
}

export default compose(
  withNamespaces(),
  withStyles(styles)
)(LoginWithGoogle)
