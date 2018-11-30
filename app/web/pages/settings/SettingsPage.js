import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import axios from 'axios'
import { withSnackbar } from 'notistack'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import LockIcon from '@material-ui/icons/Lock'
import PageContent from '../../components/PageContent'
import ProfileUpdateFormDialog from './ProfileUpdateFormDialog'
import PasswordChangeFormDialog from './PasswordChangeFormDialog'

const styles = theme => ({
  root: {
    marginBottom: 60
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  faIcon: {
    fontSize: '1.25rem'
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

  handleProfileUpdateFormDialogClose = () => {
    this.setState({ openProfileUpdateFormDialog: false })
  }

  handlePasswordChangeFormDialogClose = () => {
    this.setState({ openPasswordChangeFormDialog: false })
  }

  handleProfileUpdateFormDialogSubmit = (values, actions) => {
    const { enqueueSnackbar } = this.props
    const { auth } = this.context
    setTimeout(() => {
      axios.patch('/api/settings/profile', values, { headers: { 'Authorization': `Bearer ${auth.token}` } })
        .then(res => {
          actions.setSubmitting(false)
          auth.setUserData({ ...this.context.auth.user, ...values })
          enqueueSnackbar('Your profile has been updated!', { variant: 'success' })
          this.handleProfileUpdateFormDialogClose()
        })
        .catch(err => {
          actions.setSubmitting(false)
          enqueueSnackbar(err.response.data.error, { variant: 'error' })
        })
    }, 500)
  }

  handlePasswordChangeFormDialogSubmit = (values, actions) => {
    const { enqueueSnackbar } = this.props
    const { auth } = this.context
    setTimeout(() => {
      axios.patch('/api/settings/password', values, { headers: { 'Authorization': `Bearer ${auth.token}` } })
        .then(res => {
          actions.setSubmitting(false)
          enqueueSnackbar('Your password has been updated!', { variant: 'success' })
          this.handlePasswordChangeFormDialogClose()
        })
        .catch(err => {
          actions.setSubmitting(false)
          enqueueSnackbar(err.response.data.error, { variant: 'error' })
        })
    }, 500)
  }

  render () {
    const { classes } = this.props
    const { auth: { user } } = this.context
    const { openProfileUpdateFormDialog, openPasswordChangeFormDialog } = this.state
    return (
      <PageContent>
        <Typography variant="h5" gutterBottom>
          {'Personal Information'}
        </Typography>
        <Paper className={classes.paper}>
          <List dense>
            <ListItem dense divider>
              <ListItemText
                primary={'Name'}
                secondary={user && user.name}
              />
              <ListItemSecondaryAction>
                <Tooltip title={'Edit'}>
                  <IconButton aria-label="Edit" onClick={this.handleProfileUpdateActionClick}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem dense divider>
              <ListItemText
                primary={'Login Email'}
                secondary={user && user.email}
              />
            </ListItem>
            <ListItem dense>
              <ListItemText
                primary={'Password'}
                secondary="*********"
              />
              <ListItemSecondaryAction>
                <Tooltip title={'Change Password'}>
                  <IconButton aria-label="Change Password" onClick={this.handlePasswordChangeActionClick}>
                    <LockIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
        <ProfileUpdateFormDialog
          user={this.context.auth.user}
          open={openProfileUpdateFormDialog}
          onClose={this.handleProfileUpdateFormDialogClose}
          onSubmit={this.handleProfileUpdateFormDialogSubmit}
        />
        <PasswordChangeFormDialog
          open={openPasswordChangeFormDialog}
          onClose={this.handlePasswordChangeFormDialogClose}
          onSubmit={this.handlePasswordChangeFormDialogSubmit}
        />
      </PageContent>
    )
  }
}

SettingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
}

SettingsPage.contextTypes = {
  auth: PropTypes.object.isRequired
}

export default compose(
  withSnackbar,
  withStyles(styles)
)(SettingsPage)
