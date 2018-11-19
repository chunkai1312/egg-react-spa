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
  if (!values.name) {
    errors.name = 'name'
  }
  return errors
}

function ProfileUpdateFormDialog (props, context) {
  const { open, onClose, onSubmit, user, title, message, ok, cancel } = props
  return (
    <Form
      onSubmit={onClose}
      initialValues={user || {}}
      validate={validate}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form id="profile-update-form" onSubmit={handleSubmit}>
          <Dialog fullWidth open={open} onClose={() => onClose(null)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
              <Field type="text" name="name" label={'Name'} margin="normal" required fullWidth component={TextField} />
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

ProfileUpdateFormDialog.propTypes = {
  user: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  ok: PropTypes.string,
  cancel: PropTypes.string
}

ProfileUpdateFormDialog.defaultProps = {
  open: false,
  title: 'Update Profile',
  message: '',
  ok: 'Save',
  cancel: 'Cancel'
}

ProfileUpdateFormDialog.contextTypes = {
  t: PropTypes.func
}

export default compose(
  withStyles(styles),
  withStateHandlers(props => ({ value: props.defaultValue }), {
    onSubmit: () => () => {
      document
        .getElementById('profile-update-form')
        .dispatchEvent(new window.Event('submit', { cancelable: true }))
    }
  })
)(ProfileUpdateFormDialog)
