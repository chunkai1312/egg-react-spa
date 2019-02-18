import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { withSnackbar } from 'notistack'
import withStyles from '@material-ui/core/styles/withStyles'
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { FaGoogle as GoogleIcon, FaFacebookF as FacebookIcon } from 'react-icons/fa'
import LoginForm from './LoginForm'
import LoginWithOauth from '../../../components/LoginWithOauth'
import { login } from '../../../store/modules/auth'

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

function LoginPage (props) {
  const { classes, login, enqueueSnackbar } = props
  const { t } = useTranslation()

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={24}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm
            onSubmitSuccess={res => login(res.data.token)}
            onSubmitFailure={err => enqueueSnackbar(err.response.data.error, { variant: 'error' })}
          />
          <LoginWithOauth
            provider="google"
            url="/api/oauth/google"
            onCallback={data => login(data.token)}
            render={({ authenticate }) => (
              <Button className={classes.button} fullWidth variant="outlined" color="secondary" onClick={authenticate}>
                <GoogleIcon className={classes.leftIcon} />
                {t('login_with', { oauth: 'Google' })}
              </Button>
            )}
          />
          <LoginWithOauth
            provider="facebook"
            url="/api/oauth/facebook"
            onCallback={data => login(data.token)}
            render={({ authenticate }) => (
              <Button className={classes.button} fullWidth variant="outlined" color="primary" onClick={authenticate}>
                <FacebookIcon className={classes.leftIcon} />
                {t('login_with', { oauth: 'Facebook' })}
              </Button>
            )}
          />
          <Button className={classes.button} fullWidth component={Link} to="/signup">
            {t('register_now')}
          </Button>
        </Paper>
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
}

export default compose(
  withSnackbar,
  withStyles(styles),
  connect(
    state => ({ auth: state.auth }),
    dispatch => ({ login: token => dispatch(login(token)) })
  )
)(LoginPage)
