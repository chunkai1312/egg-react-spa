import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers } from 'recompose'
import { Form, Field } from 'react-final-form'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { TextField } from 'final-form-material-ui'

const styles = theme => ({})

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = 'Required'
  }
  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Password mismatch'
  }
  return errors
}

function PasswordChangeFormDialog (props, context) {
  const { open, onClose, onSubmit, title, message, ok, cancel } = props
  return (
    <Form
      onSubmit={onClose}
      validate={validate}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form id="password-change-form" onSubmit={handleSubmit}>
          <Dialog fullWidth open={open} onClose={() => onClose(null)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
              <Field type="password" name="password" label={'New Password'} margin="normal" required fullWidth component={TextField} />
              <Field type="password" name="password_confirmation" label={'Confirm Password'} margin="normal" required fullWidth component={TextField} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => onClose(null)} color="primary">{cancel}</Button>
              <Button onClick={onSubmit} color="primary">{ok}</Button>
            </DialogActions>
          </Dialog>
        </form>
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

export default compose(
  withStyles(styles),
  withStateHandlers(props => ({ value: props.defaultValue }), {
    onSubmit: () => () => {
      document
        .getElementById('password-change-form')
        .dispatchEvent(new window.Event('submit', { cancelable: true }))
    }
  })
)(PasswordChangeFormDialog)
