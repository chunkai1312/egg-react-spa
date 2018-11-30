import React from 'react'
import PropTypes from 'prop-types'
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

function PasswordForgotForm (props, context) {
  const { classes, onSubmit } = props

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
      onSubmit={onSubmit}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form className={classes.form}>
          <Field name="email" component={TextField} label={'Email'} margin="normal" fullWidth />
          <div className={classes.wrapper}>
            <Button type="submit" variant="contained" size='large' color="primary" fullWidth className={classes.button} disabled={isSubmitting}>
              {'Send Password Reset Link'}
            </Button>
            {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </Form>
      )}
    />
  )
}

PasswordForgotForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(PasswordForgotForm)
