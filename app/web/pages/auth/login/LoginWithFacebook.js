import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withI18n } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { FaFacebookF as FacebookIcon } from 'react-icons/fa'

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
    const { t, classes } = this.props
    return (
      <Button className={classes.button} fullWidth variant="outlined" color="primary" onClick={() => window.open('/api/oauth/facebook')}>
        <FacebookIcon className={classes.leftIcon} />
        {t('login_with', { oauth: 'Facebook' })}
      </Button>
    )
  }
}

LoginWithFacebook.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onCallback: PropTypes.func.isRequired
}

export default compose(
  withI18n(),
  withStyles(styles)
)(LoginWithFacebook)
