import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withSnackbar } from 'notistack'
import withStyles from '@material-ui/core/styles/withStyles'
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SignupForm from './SignupForm'
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
  }
})

function SignupPage (props) {
  const { classes } = props
  const { t } = useTranslation()

  const handleSubmit = (values, actions) => {
    const { login, enqueueSnackbar } = props
    setTimeout(() => {
      axios.post('/api/signup', values)
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

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={24}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <SignupForm onSubmit={handleSubmit} />
          <Button className={classes.button} fullWidth component={Link} to="/login">{t('return_to_login')}</Button>
        </Paper>
      </div>
    </div>
  )
}

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
}

SignupPage.contextTypes = {
  router: PropTypes.object.isRequired
}

export default compose(
  connect(
    state => ({ auth: state.auth }),
    dispatch => ({ login: token => dispatch(login(token)) })
  ),
  withSnackbar,
  withStyles(styles)
)(SignupPage)
