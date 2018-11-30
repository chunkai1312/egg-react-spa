import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

const styles = theme => ({})

function PasswordChangeFormDialog (props, context) {
  const { open, onClose, onSubmit, title, message, ok, cancel } = props
  return (
    <Formik
      initialValues={{ password: '', password_confirmation: '' }}
      validate={values => {
        const errors = {}
        if (!values.password) {
          errors.password = 'Required.'
        }
        if (!values.password_confirmation) {
          errors.password_confirmation = 'Required.'
        }
        if (values.password !== values.password_confirmation) {
          errors.password_confirmation = 'Password mismatch.'
        }
        return errors
      }}
      onSubmit={onSubmit}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form>
          <Dialog fullWidth open={open} onClose={() => onClose(null)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
              <Field type="password" name="password" label={'New Password'} margin="normal" required fullWidth component={TextField} />
              <Field type="password" name="password_confirmation" label={'Confirm Password'} margin="normal" required fullWidth component={TextField} />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={onClose}>{cancel}</Button>
              <Button color="primary" disabled={isSubmitting} onClick={submitForm}>{ok}</Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    />
  )
}

PasswordChangeFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  ok: PropTypes.string,
  cancel: PropTypes.string
}

PasswordChangeFormDialog.defaultProps = {
  open: false,
  title: 'Change Password',
  message: '',
  ok: 'Save',
  cancel: 'Cancel'
}

PasswordChangeFormDialog.contextTypes = {
  t: PropTypes.func
}

export default withStyles(styles)(PasswordChangeFormDialog)
