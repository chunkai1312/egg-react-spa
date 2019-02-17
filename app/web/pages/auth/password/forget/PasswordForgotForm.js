import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import compose from 'recompose/compose'
import { withTranslation } from 'react-i18next'
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

function PasswordForgotForm (props) {
  const { t, classes, onSubmitSuccess, onSubmitFailure } = props

  return (
    <Formik
      initialValues={{ email: '' }}
      validate={values => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Required.'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Please enter a valid email address.'
        }
        return errors
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          axios.post('/api/password/email', values)
            .then(res => actions.setSubmitting(false) || onSubmitSuccess(res))
            .catch(err => actions.setSubmitting(false) || onSubmitFailure(err))
        }, 500)
      }}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form className={classes.form}>
          <Field name="email" component={TextField} label={t('email')} margin="normal" fullWidth />
          <div className={classes.wrapper}>
            <Button type="submit" variant="contained" size='large' color="primary" fullWidth className={classes.button} disabled={isSubmitting}>
              {t('send_password_reset_link')}
            </Button>
            {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </Form>
      )}
    />
  )
}

PasswordForgotForm.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onSubmitSuccess: PropTypes.func,
  onSubmitFailure: PropTypes.func
}

export default compose(
  withTranslation(),
  withStyles(styles)
)(PasswordForgotForm)
