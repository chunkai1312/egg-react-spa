import React, { useState } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { withSnackbar } from 'notistack'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import LockIcon from '@material-ui/icons/Lock'
import LinkIcon from '@material-ui/icons/Link'
import LinkOffIcon from '@material-ui/icons/LinkOff'
import ProfileUpdateFormDialog from './ProfileUpdateFormDialog'
import PasswordChangeFormDialog from './PasswordChangeFormDialog'
import withAuth from '../../components/withAuth'
import LoginWithOauth from '../../components/LoginWithOauth'
import FacebookIcon from '../../components/FacebookIcon'
import GoogleIcon from '../../components/GoogleIcon'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  faIcon: {
    fontSize: '1.25rem'
  }
})

function SettingsPage (props) {
  const { classes, enqueueSnackbar, auth, auth: { user } } = props
  const [ openProfileUpdateFormDialog, setOpenProfileUpdateFormDialog ] = useState(false)
  const [ openPasswordChangeFormDialog, setOpenPasswordChangeFormDialog ] = useState(false)
  const { t } = useTranslation()
  const google = user && user.providers && user.providers.find(provider => provider.provider === 'google')
  const facebook = user && user.providers && user.providers.find(provider => provider.provider === 'facebook')

  const handleProfileUpdateActionClick = () => setOpenProfileUpdateFormDialog(true)

  const handlePasswordChangeActionClick = () => setOpenPasswordChangeFormDialog(true)

  const handleProfileUpdateFormDialogClose = (values, actions) => {
    if (!values) return setOpenProfileUpdateFormDialog(false)
    setTimeout(() => {
      axios.patch('/api/settings/profile', values, { headers: { 'Authorization': `Bearer ${auth.token}` } })
        .then(res => {
          actions.setSubmitting(false)
          enqueueSnackbar(t('info_updated'), { variant: 'success' })
          setOpenProfileUpdateFormDialog(false)
          auth.setUserData({ ...auth.user, ...values })
        })
        .catch(err => {
          actions.setSubmitting(false)
          enqueueSnackbar(err.response.data.error, { variant: 'error' })
        })
    }, 500)
  }

  const handlePasswordChangeFormDialogClose = (values, actions) => {
    if (!values) return setOpenPasswordChangeFormDialog(false)
    setTimeout(() => {
      axios.patch('/api/settings/password', values, { headers: { 'Authorization': `Bearer ${auth.token}` } })
        .then(res => {
          actions.resetForm(false)
          enqueueSnackbar(t('password_updated'), { variant: 'success' })
          setOpenPasswordChangeFormDialog(false)
        })
        .catch(err => {
          actions.resetForm(false)
          enqueueSnackbar(err.response.data.error, { variant: 'error' })
        })
    }, 500)
  }

  const handleLinkOauthProvider = data => auth.login(data.token)

  const handleUnlinkOauthProvider = povider => {
    axios.patch(`/api/settings/unlink/${povider}`, {}, { headers: { 'Authorization': `Bearer ${auth.token}` } })
      .then(res => auth.login(auth.token))
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {t('your_info')}
      </Typography>
      <Paper className={classes.paper}>
        <List dense>
          <ListItem dense divider>
            <ListItemText primary={t('name')} secondary={user && user.name} />
            <ListItemSecondaryAction>
              <Tooltip title={t('update')}>
                <IconButton onClick={handleProfileUpdateActionClick}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense>
            <ListItemText primary={t('email')} secondary={user && user.email} />
          </ListItem>
        </List>
      </Paper>
      <Typography variant="h5" gutterBottom>
        {t('your_password')}
      </Typography>
      <Paper className={classes.paper}>
        <List dense>
          <ListItem dense>
            <ListItemText primary={t('password')} secondary="**********" />
            <ListItemSecondaryAction>
              <Tooltip title={t('reset_password')}>
                <IconButton onClick={handlePasswordChangeActionClick}>
                  <LockIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      <Typography variant="h5" gutterBottom>
        {t('linked_accounts')}
      </Typography>
      <Paper className={classes.paper}>
        <List dense>
          <ListItem dense divider>
            <ListItemIcon>
              <GoogleIcon />
            </ListItemIcon>
            <ListItemText
              primary={t('oauth_account', { oauth: 'Google' })}
              secondary={(google && google.email) || t('not_yet_linked_oauth_account', { oauth: 'Google' })}
            />
            <ListItemSecondaryAction>
              {google ? (
                <Tooltip title={t('unlink_oauth_account', { oauth: 'Google' })}>
                  <IconButton onClick={() => handleUnlinkOauthProvider('google')}>
                    <LinkOffIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <LoginWithOauth
                  provider="google"
                  url="/api/oauth/google"
                  onCallback={handleLinkOauthProvider}
                  render={({ authenticate }) => (
                    <Tooltip title={t('link_oauth_account', { oauth: 'Google' })}>
                      <IconButton onClick={authenticate}>
                        <LinkIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                />
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem dense>
            <ListItemIcon>
              <FacebookIcon />
            </ListItemIcon>
            <ListItemText
              primary={t('oauth_account', { oauth: 'Facebook' })}
              secondary={(facebook && facebook.email) || t('not_yet_linked_oauth_account', { oauth: 'Facebook' })}
            />
            <ListItemSecondaryAction>
              {facebook ? (
                <Tooltip title={t('unlink_oauth_account', { oauth: 'Facebook' })}>
                  <IconButton onClick={() => handleUnlinkOauthProvider('facebook')}>
                    <LinkOffIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <LoginWithOauth
                  provider="facebook"
                  url="/api/oauth/facebook"
                  onCallback={handleLinkOauthProvider}
                  render={({ authenticate }) => (
                    <Tooltip title={t('link_oauth_account', { oauth: 'Facebook' })}>
                      <IconButton onClick={authenticate}>
                        <LinkIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                />
              )}
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
      <ProfileUpdateFormDialog
        user={user}
        open={openProfileUpdateFormDialog}
        onClose={handleProfileUpdateFormDialogClose}
      />
      <PasswordChangeFormDialog
        open={openPasswordChangeFormDialog}
        onClose={handlePasswordChangeFormDialogClose}
      />
    </div>
  )
}

SettingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
}

export default compose(
  withAuth,
  withSnackbar,
  withStyles(styles)
)(SettingsPage)
