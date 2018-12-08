import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withNamespaces } from 'react-i18next'
import axios from 'axios'
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
import FacebookIcon from '../../components/FacebookIcon'
import GoogleIcon from '../../components/GoogleIcon'
import withAuth from '../../components/withAuth'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  }
})

class SettingsPage extends React.Component {
  state = {
    openProfileUpdateFormDialog: false,
    openPasswordChangeFormDialog: false
  }

  handleProfileUpdateActionClick = () => {
    this.setState({ openProfileUpdateFormDialog: true })
  }

  handlePasswordChangeActionClick = () => {
    this.setState({ openPasswordChangeFormDialog: true })
  }

  handleProfileUpdateFormDialogClose = (values, actions) => {
    if (!values) return this.setState({ openProfileUpdateFormDialog: false })

    const { t, enqueueSnackbar } = this.props
    const { auth } = this.context
    setTimeout(() => {
      axios.patch('/api/settings/profile', values, { headers: { 'Authorization': `Bearer ${auth.token}` } })
        .then(res => {
          actions.setSubmitting(false)
          auth.setUserData({ ...this.context.auth.user, ...values })
          enqueueSnackbar(t('info_updated'), { variant: 'success' })
          this.setState({ openProfileUpdateFormDialog: false })
        })
        .catch(err => {
          actions.setSubmitting(false)
          enqueueSnackbar(err.response.data.error, { variant: 'error' })
        })
    }, 500)
  }

  handlePasswordChangeFormDialogClose = (values, actions) => {
    if (!values) return this.setState({ openPasswordChangeFormDialog: false })

    const { t, enqueueSnackbar } = this.props
    const { auth } = this.context
    setTimeout(() => {
      axios.patch('/api/settings/password', values, { headers: { 'Authorization': `Bearer ${auth.token}` } })
        .then(res => {
          actions.resetForm(false)
          enqueueSnackbar(t('password_updated'), { variant: 'success' })
          this.setState({ openPasswordChangeFormDialog: false })
        })
        .catch(err => {
          actions.resetForm(false)
          enqueueSnackbar(err.response.data.error, { variant: 'error' })
        })
    }, 500)
  }

  render () {
    const { t, classes, auth: { user } } = this.props
    const { openProfileUpdateFormDialog, openPasswordChangeFormDialog } = this.state
    const google = user && user.providers && user.providers.find(provider => provider.provider === 'google')
    const facebook = user && user.providers && user.providers.find(provider => provider.provider === 'facebook')
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
                  <IconButton onClick={this.handleProfileUpdateActionClick}>
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
                  <IconButton onClick={this.handlePasswordChangeActionClick}>
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
                secondary={(google && google.provider_user_id) || t('not_yet_linked_oauth_account', { oauth: 'Google' })}
              />
              <ListItemSecondaryAction>
                <Tooltip
                  title={google
                    ? t('unlink_oauth_account', { oauth: 'Google' })
                    : t('link_oauth_account', { oauth: 'Google' })
                  }
                >
                  <IconButton>
                    {google ? <LinkOffIcon /> : <LinkIcon />}
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem dense>
              <ListItemIcon>
                <FacebookIcon />
              </ListItemIcon>
              <ListItemText
                primary={t('oauth_account', { oauth: 'Facebook' })}
                secondary={(facebook && facebook.provider_user_id) || t('not_yet_linked_oauth_account', { oauth: 'Facebook' })}
              />
              <ListItemSecondaryAction>
                <Tooltip
                  title={facebook
                    ? t('unlink_oauth_account', { oauth: 'Facebook' })
                    : t('link_oauth_account', { oauth: 'Facebook' })
                  }
                >
                  <IconButton>
                    {facebook ? <LinkOffIcon /> : <LinkIcon />}
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
        <ProfileUpdateFormDialog user={user}
          open={openProfileUpdateFormDialog}
          onClose={this.handleProfileUpdateFormDialogClose}
        />
        <PasswordChangeFormDialog
          open={openPasswordChangeFormDialog}
          onClose={this.handlePasswordChangeFormDialogClose}
        />
      </div>
    )
  }
}

SettingsPage.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default compose(
  withNamespaces(),
  withSnackbar,
  withAuth,
  withStyles(styles)
)(SettingsPage)
