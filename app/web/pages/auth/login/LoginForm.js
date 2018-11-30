import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withNamespaces } from 'react-i18next'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
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

function LoginForm (props, context) {
  const { t, classes, onSubmit, onCallback } = props
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Required.'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Please enter a valid email address.'
        }
        if (!values.password) {
          errors.password = 'Required.'
        }
        return errors
      }}
      onSubmit={onSubmit}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form>
          <Field name="email" label={t('email')} margin="normal" fullWidth component={TextField} />
          <Field name="password" type="password" label={t('password')} margin="normal" fullWidth component={TextField} />
          <div className={classes.marginSmall} />
          <Grid direction='row' justify='space-between' alignItems='center' container>
            <Grid item>
              <Button component={Link} to="/password/forgot" disabled={false} className={classNames(classes.button, classes.noSpace)} size="small">
                {t('forgot_password')}
              </Button>
            </Grid>
            <Grid item>
              <div className={classes.wrapper}>
                <Button type="submit" disabled={isSubmitting} className={classes.button} variant="contained" size='large' color="primary">
                  {t('login')}
                </Button>
                {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </Grid>
          </Grid>
          <LoginWithGoogle onCallback={onCallback} />
          <LoginWithFacebook onCallback={onCallback} />
        </Form>
      )}
    />
  )
}

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCallback: PropTypes.func.isRequired
}

export default compose(
  withNamespaces(),
  withStyles(styles)
)(LoginForm)
