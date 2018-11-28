import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import { Form, Field } from 'react-final-form'
import { TextField } from 'final-form-material-ui'
import LoginWithGoogle from './LoginWithGoogle'
import LoginWithFacebook from './LoginWithFacebook'

const styles = theme => ({
  wrapper: {
    position: 'relative'
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
    margin: `${theme.spacing.unit}px 0`,
    textTransform: 'none'
  },
  noSpace: {
    margin: 0,
    padding: 0
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
})

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

function LoginForm (props, context) {
  const { classes, onSubmit, onCallback } = props
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ email: '', password: '' }}
      validate={validate}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form id="login-form" onSubmit={handleSubmit}>
          <Field name="email" label={'Email'} margin="normal" fullWidth component={TextField} />
          <Field name="password" type="password" label={'Password'} margin="normal" fullWidth component={TextField} />
          <div className={classes.marginSmall} />
          <Grid direction='row' justify='space-between' alignItems='center' container>
            <Grid item>
              <Button component={Link} to="/password/forgot" disabled={false} className={classNames(classes.button, classes.noSpace)} size="small">
                {'Forgot your password?'}
              </Button>
            </Grid>
            <Grid item>
              <div className={classes.wrapper}>
                <Button type="submit" disabled={submitting} className={classes.button} variant="contained" size='large' color="primary">
                  {'Login'}
                </Button>
                {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </Grid>
          </Grid>
          <LoginWithGoogle onCallback={onCallback} />
          <LoginWithFacebook onCallback={onCallback} />
        </form>
      )}
    />
  )
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCallback: PropTypes.func.isRequired
}

export default withStyles(styles)(LoginForm)
