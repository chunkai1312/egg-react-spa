import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import { compose } from 'recompose'
import qs from 'query-string'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  button: {
    margin: `${theme.spacing.unit}px 0`
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  }
})

function PasswordResetForm (props, context) {
  const { t, classes, match, location, onSubmit } = props
  const email = qs.parse(location.search).email
  return (
    <Formik
      initialValues={{
        email: email,
        token: match.params.token,
        password: '',
        password_confirmation: ''
      }}
      validate={values => {
        const errors = {}
        if (!values.password) {
          errors.password = 'Required.'
        }
        if (!values.password_confirmation) {
          errors.password_confirmation = 'Required.'
        }
        return errors
      }}
      onSubmit={onSubmit}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form className={classes.form}>
          <Field name="email" type="email" component={TextField} label={t('email')} margin="normal" fullWidth disabled />
          <Field name="password" type="password" component={TextField} label={t('password')} margin="normal" fullWidth />
          <Field name="password_confirmation" type="password" component={TextField} label={t('confirm_password')} margin="normal" fullWidth />
          <Field name="token" type="hidden" component="input" />
          <div className={classes.wrapper}>
            <Button type="submit" variant="contained" size='large' color="primary" fullWidth className={classes.button} disabled={isSubmitting}>
              {t('reset_password')}
            </Button>
            {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </Form>
      )}
    />
  )
}

PasswordResetForm.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default compose(
  withRouter,
  withNamespaces(),
  withStyles(styles)
)(PasswordResetForm)
