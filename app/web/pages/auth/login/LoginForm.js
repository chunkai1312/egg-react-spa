import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import axios from 'axios'
import compose from 'recompose/compose'
import { withNamespaces } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

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
  button: {
    margin: `${theme.spacing.unit}px 0`,
    textTransform: 'none'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  }
})

function LoginForm (props, context) {
  const { t, classes, onSubmitSuccess, onSubmitFailure } = props
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
      onSubmit={(values, actions) => {
        setTimeout(() => {
          axios.post('/api/login', values)
            .then(res => actions.setSubmitting(false) || onSubmitSuccess(res))
            .catch(err => actions.setSubmitting(false) || onSubmitFailure(err))
        }, 500)
      }}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form className={classes.form}>
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
        </Form>
      )}
    />
  )
}

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onSubmitSuccess: PropTypes.func,
  onSubmitFailure: PropTypes.func
}

export default compose(
  withNamespaces(),
  withStyles(styles)
)(LoginForm)
