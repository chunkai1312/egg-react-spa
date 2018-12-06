import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withNamespaces } from 'react-i18next'
import { Link } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import withStyles from '@material-ui/core/styles/withStyles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PasswordResetForm from './PasswordResetForm'

const styles = theme => ({
  root: {
    flex: '1 0 100%'
  },
  container: {
    minHeight: '100vh',
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    margin: theme.spacing.unit
  }
})

class PasswordResetPage extends React.Component {
  render () {
    const { t, classes, enqueueSnackbar } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <main className={classes.main}>
            <Paper className={classes.paper} elevation={24}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Reset Password
              </Typography>
              <PasswordResetForm
                onSubmitSuccess={res => enqueueSnackbar(t('password_updated'), { variant: 'success' })}
                onSubmitFailure={err => enqueueSnackbar(err.response.data.error, { variant: 'error' })}
              />
              <Button className={classes.button} fullWidth component={Link} to="/login">{t('return_to_login')}</Button>
            </Paper>
          </main>
        </div>
      </div>
    )
  }
}

PasswordResetPage.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
}

export default compose(
  withSnackbar,
  withNamespaces(),
  withStyles(styles)
)(PasswordResetPage)
