import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import { withTranslation } from 'react-i18next'
import { withSnackbar } from 'notistack'
import withStyles from '@material-ui/core/styles/withStyles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PasswordForgotForm from './PasswordForgotForm'

const styles = theme => ({
  root: {
    minHeight: '100vh',
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main
  },
  container: {
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

class PasswordForgotPage extends React.Component {
  render () {
    const { t, classes, enqueueSnackbar } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Paper className={classes.paper} elevation={24}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <PasswordForgotForm
              onSubmitSuccess={res => enqueueSnackbar('We have e-mailed your password reset link!', { variant: 'success' })}
              onSubmitFailure={err => enqueueSnackbar(err.response.data.error, { variant: 'error' })}
            />
            <Button className={classes.button} fullWidth component={Link} to="/login">{t('return_to_login')}</Button>
          </Paper>
        </div>
      </div>
    )
  }
}

PasswordForgotPage.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
}

export default compose(
  withTranslation(),
  withSnackbar,
  withStyles(styles)
)(PasswordForgotPage)
