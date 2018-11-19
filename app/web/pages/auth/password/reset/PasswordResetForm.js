import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose, withHandlers } from 'recompose'
import qs from 'query-string'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Form, Field } from 'react-final-form'
import { TextField } from 'final-form-material-ui'

const styles = theme => ({
  wrapper: {
    position: 'relative',
    marginTop: theme.spacing.unit * 3
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  marginSmall: {
    minHeight: theme.spacing.unit * 1
  },
  marginLarge: {
    minHeight: theme.spacing.unit * 4
  },
  button: {
    margin: `${theme.spacing.unit}px 0`
  },
  noSpace: {
    margin: 0,
    padding: 0
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  }
})

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = 'Required'
  }
  return errors
}

function PasswordResetForm (props, context) {
  const { classes, match, location, onSubmit, handleClick } = props
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ email: qs.parse(location.search).email, token: match.params.token }}
      validate={validate}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form id="login-form" className={classes.form} onSubmit={handleSubmit}>
          <Field name="email" type="email" component={TextField} label={'Email'} margin="normal" fullWidth disabled />
          <Field name="password" type="password" component={TextField} label={'Password'} margin="normal" fullWidth />
          <Field name="password_confirmation" type="password" component={TextField} label={'Confirm Password'} margin="normal" fullWidth />
          <Field name="token" type="hidden" component="input" />
          <div className={classes.wrapper}>
            <Button type="submit" fullWidth disabled={submitting} className={classes.button} variant="contained" size='large' color="primary" onClick={handleClick}>
              {'Change Password'}
            </Button>
            {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </form>
      )}
    />
  )
}

PasswordResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default compose(
  withRouter,
  withStyles(styles),
  withHandlers({
    handleClick: () => () => {
      document
        .getElementById('login-form')
        .dispatchEvent(new window.Event('submit', { cancelable: true }))
    }
  })
)(PasswordResetForm)
