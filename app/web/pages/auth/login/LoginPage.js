import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import axios from 'axios'
import { withSnackbar } from 'notistack'
import Avatar from '@material-ui/core/Avatar'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import LoginForm from './LoginForm'
import { login } from '../../../store/modules/auth'

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

class LoginPage extends React.Component {
  handleSubmit = (values, actions) => {
    const { login, enqueueSnackbar } = this.props
    setTimeout(() => {
      axios.post('/api/login', values)
        .then(res => {
          actions.setSubmitting(false)
          login(res.data.token)
        })
        .catch(err => {
          actions.setSubmitting(false)
          enqueueSnackbar(err.response.data.error, { variant: 'error' })
        })
    }, 500)
  }

  handleCallback = (token) => {
    this.props.login(token)
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <main className={classes.main}>
            <Paper className={classes.paper} elevation={24}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <LoginForm onSubmit={this.handleSubmit} onCallback={this.handleCallback} />
            </Paper>
          </main>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
}

export default compose(
  connect(
    state => ({ auth: state.auth }),
    dispatch => ({
      login: token => dispatch(login(token))
    })
  ),
  withSnackbar,
  withStyles(styles)
)(LoginPage)
