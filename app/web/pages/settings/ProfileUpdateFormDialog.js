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

function ProfileUpdateFormDialog (props, context) {
  const { open, onClose, onSubmit, user, title, message, ok, cancel } = props
  return (
    <Formik
      initialValues={user || { name: '' }}
      validate={values => {
        const errors = {}
        if (!values.name) {
          errors.name = 'name'
        }
        return errors
      }}
      onSubmit={onSubmit}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form>
          <Dialog fullWidth open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
              <Field type="text" name="name" label={'Name'} margin="normal" required fullWidth component={TextField} />
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

export default withStyles(styles)(ProfileUpdateFormDialog)
