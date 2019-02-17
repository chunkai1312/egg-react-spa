import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withTranslation } from 'react-i18next'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

const styles = theme => ({})

function ProfileUpdateFormDialog (props) {
  const { t, open, onClose, user } = props
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
      onSubmit={onClose}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form>
          <Dialog fullWidth open={open} onClose={() => onClose(null)} onKeyDown={(e) => (e.which === 13) && submitForm()}>
            <DialogTitle>{t('your_info')}</DialogTitle>
            <DialogContent>
              <Field type="text" name="name" label={t('name')} margin="normal" required fullWidth component={TextField} />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => onClose(null)}>{t('cancel')}</Button>
              <Button color="primary" disabled={isSubmitting} onClick={submitForm}>{t('ok')}</Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    />
  )
}

ProfileUpdateFormDialog.propTypes = {
  t: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object
}

ProfileUpdateFormDialog.defaultProps = {
  open: false
}

export default compose(
  withTranslation(),
  withStyles(styles)
)(ProfileUpdateFormDialog)
