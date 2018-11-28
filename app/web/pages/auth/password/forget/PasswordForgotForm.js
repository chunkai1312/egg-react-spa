import React from 'react'
import PropTypes from 'prop-types'
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
  if (!values.email) {
    errors.email = 'Required'
  }
  return errors
}

function PasswordForgotForm (props, context) {
  const { classes, onSubmit } = props
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ email: '' }}
      validate={validate}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form id="password-forgot-form" className={classes.form} onSubmit={handleSubmit}>
          <Field name="email" component={TextField} label={'Email'} margin="normal" fullWidth />
          <div className={classes.wrapper}>
            <Button type="submit" fullWidth disabled={submitting} className={classes.button} variant="contained" size='large' color="primary">
              {'Send Password Reset Link'}
            </Button>
            {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </form>
      )}
    />
  )
}

PasswordForgotForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(PasswordForgotForm)
