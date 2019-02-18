import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
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

function LoginForm (props) {
  const { classes, onSubmit } = props
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }}
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
        if (values.password !== values.password_confirmation) {
          errors.password_confirmation = 'Password mismatch.'
        }
        return errors
      }}
      onSubmit={onSubmit}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form>
          <Field name="name" label={t('name')} margin="normal" fullWidth component={TextField} />
          <Field name="email" label={t('email')} margin="normal" fullWidth component={TextField} />
          <Field name="password" type="password" label={t('password')} margin="normal" fullWidth component={TextField} />
          <Field name="password_confirmation" type="password" label={t('confirm_password')} margin="normal" fullWidth component={TextField} />
          <div className={classes.wrapper}>
            <Button type="submit" variant="contained" size='large' color="primary" fullWidth className={classes.button} disabled={isSubmitting}>
              {t('register')}
            </Button>
            {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </Form>
      )}
    />
  )
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(LoginForm)
