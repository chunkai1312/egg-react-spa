import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

const styles = theme => ({})

function PasswordChangeFormDialog (props) {
  const { open, onClose } = props
  const { t } = useTranslation()

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
      onSubmit={onClose}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form>
          <Dialog fullWidth open={open} onClose={() => onClose(null)} onKeyDown={(e) => (e.which === 13) && submitForm()}>
            <DialogTitle>{t('your_password')}</DialogTitle>
            <DialogContent>
              <Field type="password" name="password" label={t('new_password')} margin="normal" required fullWidth component={TextField} />
              <Field type="password" name="password_confirmation" label={t('confirm_password')} margin="normal" required fullWidth component={TextField} />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => onClose(null)}>{t('cancel')}</Button>
              <Button type="submit" color="primary" disabled={isSubmitting} onClick={submitForm}>{t('ok')}</Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    />
  )
}

PasswordChangeFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

PasswordChangeFormDialog.defaultProps = {
  open: false
}

export default withStyles(styles)(PasswordChangeFormDialog)
